import React from 'react';

/**
 * Renderizador de Markdown sem dependência externa.
 *
 * A IA responde em Markdown, e antes o texto ia para a tela com
 * `whitespace-pre-wrap`. O resultado era o usuário lendo `**assim**`,
 * `---` e `1.` crus no meio do guia.
 *
 * Cobrimos aqui o subconjunto que os prompts realmente produzem:
 * títulos, negrito, itálico, código, links, listas, citações, tabelas
 * e linha divisória.
 *
 * Underline solto (_assim_) fica literal de propósito: o conteúdo cita
 * coisas como user_id e utm_source, que viravam itálico por engano.
 */

type Nodes = React.ReactNode[];

const INLINE =
  /`([^`]+)`|\*\*\*([\s\S]+?)\*\*\*|\*\*([\s\S]+?)\*\*|__([\s\S]+?)__|\*([^*\n]+?)\*|~~([\s\S]+?)~~|\[([^\]]*)\]\(([^)\s]+)[^)]*\)/;

const HR = /^ {0,3}([-*_])(?:[ \t]*\1){2,}[ \t]*$/;
const HEADING = /^ {0,3}(#{1,6})[ \t]+(.*?)[ \t]*#*[ \t]*$/;
const FENCE = /^ {0,3}(`{3,}|~{3,})(.*)$/;
const QUOTE = /^ {0,3}>[ \t]?(.*)$/;
const ITEM = /^([ \t]*)([-*+]|\d{1,9}[.)])[ \t]+(.*)$/;
const TABLE_ROW = /\|/;
const TABLE_SEP = /^ {0,3}\|?(?:[ \t]*:?-+:?[ \t]*\|)+[ \t]*:?-*:?[ \t]*\|?[ \t]*$/;

/** Só deixa passar link que leva a algum lugar seguro. */
function safeHref(href: string): string | null {
  const url = href.trim();
  if (/^(https?:|mailto:)/i.test(url)) return url;
  if (url.startsWith('/') || url.startsWith('#')) return url;
  return null;
}

function isBlockStart(line: string): boolean {
  return (
    HR.test(line) ||
    HEADING.test(line) ||
    FENCE.test(line) ||
    QUOTE.test(line) ||
    ITEM.test(line)
  );
}

/** Quebra de linha simples vira <br>, como o usuário escreveu. */
function withBreaks(text: string, key: string): Nodes {
  const parts = text.split('\n');
  const out: Nodes = [];
  parts.forEach((part, index) => {
    if (index > 0) out.push(<br key={`${key}-br${index}`} />);
    if (part) out.push(part);
  });
  return out;
}

function inline(text: string, key: string): Nodes {
  const re = new RegExp(INLINE.source, 'g');
  const out: Nodes = [];
  let last = 0;
  let count = 0;
  let match = re.exec(text);

  while (match) {
    if (match.index > last) {
      out.push(...withBreaks(text.slice(last, match.index), `${key}-t${count}`));
    }
    const k = `${key}-i${count}`;
    const [, code, bolditalic, bold, boldAlt, italic, strike, linkText, linkHref] = match;

    if (code !== undefined) {
      out.push(
        <code key={k} className="rounded-md border border-white/10 bg-black/40 px-1.5 py-0.5 font-mono text-[0.85em] text-blue-200">
          {code}
        </code>,
      );
    } else if (bolditalic !== undefined) {
      out.push(
        <strong key={k} className="font-semibold text-white">
          <em className="italic">{inline(bolditalic, k)}</em>
        </strong>,
      );
    } else if (bold !== undefined || boldAlt !== undefined) {
      out.push(
        <strong key={k} className="font-semibold text-white">
          {inline((bold ?? boldAlt) as string, k)}
        </strong>,
      );
    } else if (italic !== undefined) {
      out.push(
        <em key={k} className="italic text-slate-200">
          {inline(italic, k)}
        </em>,
      );
    } else if (strike !== undefined) {
      out.push(
        <s key={k} className="text-slate-500">
          {inline(strike, k)}
        </s>,
      );
    } else if (linkText !== undefined) {
      const href = safeHref(linkHref ?? '');
      if (href) {
        out.push(
          <a
            key={k}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="font-medium text-blue-300 underline decoration-blue-400/40 underline-offset-2 transition hover:text-blue-200"
          >
            {inline(linkText, k)}
          </a>,
        );
      } else {
        out.push(<React.Fragment key={k}>{linkText}</React.Fragment>);
      }
    }

    count += 1;
    last = match.index + match[0].length;
    re.lastIndex = last;
    match = re.exec(text);
  }

  if (last < text.length) out.push(...withBreaks(text.slice(last), `${key}-t${count}`));
  return out;
}

function renderCells(row: string): string[] {
  return row
    .replace(/^[ \t]*\|/, '')
    .replace(/\|[ \t]*$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function alignOf(spec: string): 'left' | 'center' | 'right' {
  const value = spec.trim();
  if (value.startsWith(':') && value.endsWith(':')) return 'center';
  if (value.endsWith(':')) return 'right';
  return 'left';
}

function blocks(source: string, key: string): Nodes {
  const lines = source.replace(/\r\n?/g, '\n').split('\n');
  const out: Nodes = [];
  let i = 0;
  let n = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i += 1;
      continue;
    }
    const k = `${key}-b${n}`;
    n += 1;

    const fence = FENCE.exec(line);
    if (fence) {
      const marker = fence[1][0];
      const closing = new RegExp(`^ {0,3}${marker === '`' ? '`' : '~'}{3,}[ \\t]*$`);
      const buffer: string[] = [];
      i += 1;
      while (i < lines.length && !closing.test(lines[i])) {
        buffer.push(lines[i]);
        i += 1;
      }
      i += 1;
      out.push(
        <pre key={k} className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-4 text-xs leading-6 text-slate-200">
          <code>{buffer.join('\n')}</code>
        </pre>,
      );
      continue;
    }

    if (HR.test(line)) {
      out.push(<hr key={k} className="border-white/10" />);
      i += 1;
      continue;
    }

    const heading = HEADING.exec(line);
    if (heading) {
      const level = heading[1].length;
      const size = level <= 3 ? 'text-base' : 'text-sm';
      out.push(
        <h4 key={k} className={`${size} pt-1 font-bold text-blue-200`}>
          {inline(heading[2], k)}
        </h4>,
      );
      i += 1;
      continue;
    }

    if (QUOTE.test(line)) {
      const buffer: string[] = [];
      while (i < lines.length && QUOTE.test(lines[i])) {
        buffer.push((QUOTE.exec(lines[i]) as RegExpExecArray)[1]);
        i += 1;
      }
      out.push(
        <blockquote key={k} className="space-y-2 border-l-2 border-blue-400/40 bg-white/[0.02] py-2 pl-4 text-slate-300">
          {blocks(buffer.join('\n'), k)}
        </blockquote>,
      );
      continue;
    }

    if (TABLE_ROW.test(line) && i + 1 < lines.length && TABLE_SEP.test(lines[i + 1])) {
      const header = renderCells(line);
      const aligns = renderCells(lines[i + 1]).map(alignOf);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim() && TABLE_ROW.test(lines[i])) {
        rows.push(renderCells(lines[i]));
        i += 1;
      }
      out.push(
        <div key={k} className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr>
                {header.map((cell, index) => (
                  <th
                    key={`${k}-h${index}`}
                    style={{ textAlign: aligns[index] ?? 'left' }}
                    className="bg-white/[0.05] px-3 py-2 font-semibold text-slate-100"
                  >
                    {inline(cell, `${k}-h${index}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={`${k}-r${rowIndex}`}>
                  {row.map((cell, index) => (
                    <td
                      key={`${k}-r${rowIndex}c${index}`}
                      style={{ textAlign: aligns[index] ?? 'left' }}
                      className="border-t border-white/5 px-3 py-2 align-top leading-6 text-slate-300"
                    >
                      {inline(cell, `${k}-r${rowIndex}c${index}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    const first = ITEM.exec(line);
    if (first) {
      const ordered = /\d/.test(first[2]);
      const baseIndent = first[1].length;
      const items: string[] = [];

      while (i < lines.length) {
        const current = lines[i];

        if (!current.trim()) {
          const next = lines[i + 1];
          if (next && (ITEM.test(next) || /^[ \t]{2,}\S/.test(next))) {
            if (items.length) items[items.length - 1] += '\n';
            i += 1;
            continue;
          }
          break;
        }

        const item = ITEM.exec(current);
        if (item && item[1].length <= baseIndent + 1) {
          if (/\d/.test(item[2]) !== ordered) break;
          items.push(item[3]);
          i += 1;
          continue;
        }

        if (item || /^[ \t]{2,}\S/.test(current)) {
          if (!items.length) break;
          items[items.length - 1] += `\n${current.replace(new RegExp(`^[ \\t]{0,${baseIndent + 2}}`), '')}`;
          i += 1;
          continue;
        }

        break;
      }

      const listClass = ordered
        ? 'list-decimal space-y-2 pl-5 marker:font-semibold marker:text-blue-300'
        : 'list-disc space-y-2 pl-5 marker:text-blue-400/70';
      const children = items.map((raw, index) => {
        const content = raw.replace(/[ \t\n]+$/, '');
        const ik = `${k}-li${index}`;
        const nested = content.includes('\n') && content.split('\n').some(isBlockStart);
        return (
          <li key={ik} className="leading-7 text-slate-300">
            {nested ? <div className="space-y-2">{blocks(content, ik)}</div> : inline(content, ik)}
          </li>
        );
      });

      out.push(
        ordered ? (
          <ol key={k} className={listClass}>
            {children}
          </ol>
        ) : (
          <ul key={k} className={listClass}>
            {children}
          </ul>
        ),
      );
      continue;
    }

    const buffer: string[] = [];
    while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) {
      buffer.push(lines[i].trim());
      i += 1;
    }
    out.push(
      <p key={k} className="leading-7 text-slate-300">
        {inline(buffer.join('\n'), k)}
      </p>,
    );
  }

  return out;
}

export function Markdown({ text, className }: { text: string; className?: string }) {
  if (!text?.trim()) return null;
  return <div className={className ?? 'space-y-3 text-sm'}>{blocks(text, 'md')}</div>;
}

export interface MarkdownSection {
  title: string;
  body: string;
}

/**
 * Separa a resposta nas seções que o prompt pediu. O nível de título é
 * descoberto na própria resposta: se a IA usar `##` em vez de `###`, as
 * seções continuam saindo certas, e os títulos mais fundos seguem como
 * subtítulo dentro do corpo.
 */
export function splitMarkdownSections(text: string): { intro: string; sections: MarkdownSection[] } {
  const lines = (text ?? '').replace(/\r\n?/g, '\n').split('\n');
  const levels = lines
    .map((line) => HEADING.exec(line))
    .filter((match): match is RegExpExecArray => Boolean(match))
    .map((match) => match[1].length);

  if (!levels.length) return { intro: text?.trim() ?? '', sections: [] };

  const top = Math.min(...levels);
  const intro: string[] = [];
  const sections: MarkdownSection[] = [];
  let current: MarkdownSection | null = null;

  for (const line of lines) {
    const heading = HEADING.exec(line);
    if (heading && heading[1].length === top) {
      current = { title: heading[2], body: '' };
      sections.push(current);
      continue;
    }
    if (current) current.body += `${line}\n`;
    else intro.push(line);
  }

  return {
    intro: intro.join('\n').trim(),
    sections: sections.map((section) => ({ title: section.title, body: section.body.trim() })),
  };
}
