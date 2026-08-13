import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TechForWeb Learning Lab | Ideias para estudar e explicar',
  description: 'Explore temas de produto, growth, marketing e estratégia para estudar, aplicar e transformar em conteúdo curto.',
  applicationName: 'TechForWeb Learning Lab',
  creator: 'Anderson',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#07111f',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={outfit.variable}>
      <body className={`${outfit.className} min-h-screen antialiased`}>{children}</body>
    </html>
  );
}
