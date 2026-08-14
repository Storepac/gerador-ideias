import type { GrowthTopic } from './growthTopics';
import { OFFICIAL_TOPICS, mergeOfficialTopics } from './topicCatalog';

export interface WeeklyPlanItem {
  id: string;
  topicId: string;
  topic: GrowthTopic;
  weekNumber: number;
  status: 'planned' | 'studying' | 'mastered' | 'applied';
  notes: string;
  addedAt: string;
  completedAt?: string;
  aiExplanationCache?: string;
}

export interface UserPreferences {
  currentWeek: number;
  weeklyGoal: number;
  targetCategories: string[];
  productContext: string;
  bookmarkedTopicIds: string[];
}

const STORAGE_KEYS = {
  TOPICS: 'growth_pm_topics_v1',
  PLAN: 'growth_pm_weekly_plan_v1',
  PREFS: 'growth_pm_user_prefs_v1',
};

export function getStoredTopics(): GrowthTopic[] {
  if (typeof window === 'undefined') return OFFICIAL_TOPICS;

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TOPICS);
    if (!raw) return OFFICIAL_TOPICS;

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return OFFICIAL_TOPICS;

    const merged = mergeOfficialTopics(parsed as GrowthTopic[]);

    if (merged.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(merged));
    }

    return merged;
  } catch (error) {
    console.error('Failed to parse stored topics:', error);
    return OFFICIAL_TOPICS;
  }
}

export function saveStoredTopics(topics: GrowthTopic[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(topics));
  } catch (error) {
    console.error('Failed to save topics:', error);
  }
}

export function getStoredPlan(): WeeklyPlanItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PLAN);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (error) {
    console.error('Failed to parse study plan:', error);
    return [];
  }
}

export function saveStoredPlan(plan: WeeklyPlanItem[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEYS.PLAN, JSON.stringify(plan));
  } catch (error) {
    console.error('Failed to save plan:', error);
  }
}

export function getStoredPrefs(): UserPreferences {
  const defaultPrefs: UserPreferences = {
    currentWeek: 1,
    weeklyGoal: 1,
    targetCategories: [],
    productContext: '',
    bookmarkedTopicIds: [],
  };

  if (typeof window === 'undefined') return defaultPrefs;

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PREFS);
    if (!raw) return defaultPrefs;
    return { ...defaultPrefs, ...JSON.parse(raw) };
  } catch {
    return defaultPrefs;
  }
}

export function saveStoredPrefs(prefs: UserPreferences): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify(prefs));
  } catch (error) {
    console.error('Failed to save prefs:', error);
  }
}
