import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roteiros de 60–90 segundos',
  description: 'Escolha um tema de produto, growth, dados, IA ou marketing e transforme o estudo em uma estrutura de vídeo curto para explicar com clareza.',
  alternates: {
    canonical: '/roteiro',
  },
  openGraph: {
    title: 'Roteiros de 60–90 segundos | TechForWeb Learning Lab',
    description: 'Transforme conceitos de produto, growth, dados e IA em explicações curtas para conteúdo e revisão de estudo.',
    url: '/roteiro',
  },
  twitter: {
    title: 'Roteiros de 60–90 segundos | TechForWeb Learning Lab',
    description: 'Transforme estudo em conteúdo curto sobre produto, growth, dados e IA.',
  },
};

export default function RoteiroLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
