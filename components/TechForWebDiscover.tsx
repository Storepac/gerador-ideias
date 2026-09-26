'use client';

import type { GrowthTopic } from '@/lib/growthTopics';
import { RandomWheel } from './RandomWheel';

interface TechForWebDiscoverProps {
  topics: GrowthTopic[];
  onExplain: (topic: GrowthTopic) => void;
  onAddToPlan: (topic: GrowthTopic) => void;
  onStartChallenge: (topic: GrowthTopic) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  plannedTopicIds: string[];
  onOpenLibrary?: () => void;
}

/**
 * Antes este componente repintava a roleta por cima, com um bloco de
 * `style jsx global` que trocava o dourado herdado pelo azul do site.
 *
 * Isso causava um flash: o styled-jsx só entra depois da hidratação, então a
 * primeira pintura vinha dourada, com serifa, e só depois virava azul. Quem
 * abria o site via a tela piscar.
 *
 * As cores agora saem certas da própria RandomWheel. Este componente ficou só
 * como o nome da seção na home, e é onde entra o que for específico do
 * Descobrir sem mexer na roleta.
 */
export function TechForWebDiscover(props: TechForWebDiscoverProps) {
  return <RandomWheel {...props} />;
}
