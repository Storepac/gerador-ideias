import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
});

const siteUrl = 'https://ideias.techforweb.com.br';
const techForWebUrl = 'https://www.techforweb.com.br';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'TechForWeb Learning Lab',
      url: siteUrl,
      inLanguage: 'pt-BR',
      description: 'Laboratório de aprendizado sobre Product Management, Growth, Marketing, Dados, IA, SaaS e estratégia.',
      publisher: {
        '@type': 'Organization',
        '@id': `${techForWebUrl}/#techforweb`,
        name: 'TechForWeb',
        url: techForWebUrl,
      },
    },
    {
      '@type': 'WebApplication',
      '@id': `${siteUrl}/#learning-lab`,
      name: 'TechForWeb Learning Lab',
      url: siteUrl,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      inLanguage: 'pt-BR',
      isAccessibleForFree: true,
      description: 'Ferramenta para descobrir temas, estudar conceitos, praticar com casos e transformar aprendizados em roteiros curtos.',
      creator: {
        '@type': 'Person',
        name: 'Anderson',
        url: techForWebUrl,
      },
      publisher: {
        '@type': 'Organization',
        '@id': `${techForWebUrl}/#techforweb`,
        name: 'TechForWeb',
        url: techForWebUrl,
      },
      about: [
        'Product Management',
        'Growth Product Management',
        'Product Analytics',
        'Artificial Intelligence',
        'SaaS',
        'Marketing',
        'Growth',
        'Experimentation',
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'TechForWeb Learning Lab | Produto, Growth, Dados e IA',
    template: '%s | TechForWeb Learning Lab',
  },
  description: 'Explore temas de Product Management, Growth, Marketing, Dados, IA e SaaS para estudar, aplicar em problemas reais e transformar aprendizados em conteúdo curto.',
  keywords: [
    'product management',
    'growth product management',
    'growth',
    'product analytics',
    'inteligência artificial',
    'IA para produtos',
    'SaaS',
    'marketing digital',
    'CRO',
    'product-led growth',
    'experimentação',
    'métricas de produto',
    'conteúdo para product managers',
    'TechForWeb',
  ],
  authors: [{ name: 'Anderson', url: techForWebUrl }],
  creator: 'Anderson',
  publisher: 'TechForWeb',
  applicationName: 'TechForWeb Learning Lab',
  category: 'Education',
  classification: 'Product Management, Growth, Dados, IA e Marketing',
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: `${techForWebUrl}/favicon.ico`,
    shortcut: `${techForWebUrl}/favicon.ico`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName: 'TechForWeb Learning Lab',
    title: 'TechForWeb Learning Lab | Produto, Growth, Dados e IA',
    description: 'Aprenda conceitos, pratique com casos e transforme estudo em explicações curtas sobre produto, growth, dados e IA.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechForWeb Learning Lab | Produto, Growth, Dados e IA',
    description: 'Aprenda, aplique e explique conceitos de produto, growth, dados, IA e marketing.',
  },
};

export const viewport: Viewport = {
  themeColor: '#07111f',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={outfit.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${outfit.className} min-h-screen antialiased`}>{children}</body>
    </html>
  );
}
