import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#07111f',
          color: '#ffffff',
          padding: '72px 80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 28 }}>
          <div style={{ display: 'flex', fontWeight: 800 }}>TechForWeb</div>
          <div style={{ display: 'flex', color: '#93c5fd' }}>Learning Lab</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 980 }}>
          <div style={{ display: 'flex', color: '#67e8f9', fontSize: 28, fontWeight: 700 }}>
            Produto · Growth · Dados · IA
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 72,
              lineHeight: 1.02,
              fontWeight: 900,
              letterSpacing: '-2px',
            }}
          >
            Aprenda. Aplique. Explique.
          </div>
          <div style={{ display: 'flex', maxWidth: 900, color: '#cbd5e1', fontSize: 29, lineHeight: 1.35 }}>
            Temas, frameworks, desafios e roteiros curtos para transformar estudo em repertório prático.
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 24, color: '#94a3b8' }}>
          ideias.techforweb.com.br
        </div>
      </div>
    ),
    { ...size },
  );
}
