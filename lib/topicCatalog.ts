import type { GrowthTopic } from './growthTopics';
import { INITIAL_TOPICS } from './growthTopics';
import { EXTRA_GROWTH_TOPICS } from './extraGrowthTopics';

export const OFFICIAL_TOPICS: GrowthTopic[] = [...INITIAL_TOPICS, ...EXTRA_GROWTH_TOPICS];

export function mergeOfficialTopics(storedTopics: GrowthTopic[]): GrowthTopic[] {
  const storedById = new Map(storedTopics.map((topic) => [topic.id, topic]));
  const missingOfficialTopics = OFFICIAL_TOPICS.filter((topic) => !storedById.has(topic.id));

  return [...storedTopics, ...missingOfficialTopics];
}
