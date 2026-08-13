import { GrowthTopic, INITIAL_TOPICS } from './growthTopics';

export interface WeeklyPlanItem {
  id: string;
  topicId: string;
  topic: GrowthTopic;
  weekNumber: number; // e.g. 1, 2, 3...
  status: 'planned' | 'studying' | 'mastered' | 'applied';
  notes: string;
  addedAt: string;
  completedAt?: string;
  aiExplanationCache?: string;
}

export interface UserPreferences {
  currentWeek: number;
  weeklyGoal: number; // topics per week, default 1 or 2
  targetCategories: string[];
  productContext: string; // e.g. "Fintech B2C SaaS"
  bookmarkedTopicIds: string[];
}

const STORAGE_KEYS = {
  TOPICS: 'growth_pm_topics_v1',
  PLAN: 'growth_pm_weekly_plan_v1',
  PREFS: 'growth_pm_user_prefs_v1',
};

export function getStoredTopics(): GrowthTopic[] {
  if (typeof window === 'undefined') return INITIAL_TOPICS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TOPICS);
    if (!raw) return INITIAL_TOPICS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_TOPICS;
  } catch (e) {
    console.error('Failed to parse stored topics:', e);
    return INITIAL_TOPICS;
  }
}

export function saveStoredTopics(topics: GrowthTopic[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(topics));
  } catch (e) {
    console.error('Failed to save topics:', e);
  }
}

export function getStoredPlan(): WeeklyPlanItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PLAN);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse study plan:', e);
    return [];
  }
}

export function saveStoredPlan(plan: WeeklyPlanItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.PLAN, JSON.stringify(plan));
  } catch (e) {
    console.error('Failed to save study plan:', e);
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
  } catch (e) {
    return defaultPrefs;
  }
}

export function saveStoredPrefs(prefs: UserPreferences): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify(prefs));
  } catch (e) {
    console.error('Failed to save prefs:', e);
  }
}
