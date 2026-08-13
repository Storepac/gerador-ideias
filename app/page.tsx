'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { TechForWebDiscover } from '@/components/TechForWebDiscover';
import { StudyPlanner } from '@/components/StudyPlanner';
import { TopicLibrary } from '@/components/TopicLibrary';
import { AiDeepDiveModal } from '@/components/AiDeepDiveModal';
import { CaseChallengeModal } from '@/components/CaseChallengeModal';
import { NewTopicModal } from '@/components/NewTopicModal';
import { ProductContextModal } from '@/components/ProductContextModal';
import { GrowthTopic, INITIAL_TOPICS } from '@/lib/growthTopics';
import {
  getStoredTopics,
  saveStoredTopics,
  getStoredPlan,
  saveStoredPlan,
  getStoredPrefs,
  saveStoredPrefs,
  WeeklyPlanItem,
  UserPreferences,
} from '@/lib/storage';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'roulette' | 'planner' | 'library'>('roulette');
  const [topics, setTopics] = useState<GrowthTopic[]>(() => typeof window !== 'undefined' ? getStoredTopics() : INITIAL_TOPICS);
  const [plan, setPlan] = useState<WeeklyPlanItem[]>(() => typeof window !== 'undefined' ? getStoredPlan() : []);
  const [prefs, setPrefs] = useState<UserPreferences>(() => typeof window !== 'undefined' ? getStoredPrefs() : {
    currentWeek: 1,
    weeklyGoal: 1,
    targetCategories: [],
    productContext: '',
    bookmarkedTopicIds: [],
  });

  const [explainTopic, setExplainTopic] = useState<GrowthTopic | null>(null);
  const [challengeTopic, setChallengeTopic] = useState<GrowthTopic | null>(null);
  const [isNewTopicOpen, setIsNewTopicOpen] = useState(false);
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [targetWeekForAdd, setTargetWeekForAdd] = useState(1);

  const handleToggleBookmark = (topicId: string) => {
    const updatedBookmarks = prefs.bookmarkedTopicIds.includes(topicId)
      ? prefs.bookmarkedTopicIds.filter((id) => id !== topicId)
      : [...prefs.bookmarkedTopicIds, topicId];
    const updatedPrefs = { ...prefs, bookmarkedTopicIds: updatedBookmarks };
    setPrefs(updatedPrefs);
    saveStoredPrefs(updatedPrefs);
  };

  const handleAddToPlan = (topic: GrowthTopic, cachedExplanation?: string, weekNum?: number) => {
    const targetWeek = weekNum || prefs.currentWeek || 1;
    const existingIndex = plan.findIndex((item) => item.topicId === topic.id);
    let updatedPlan: WeeklyPlanItem[];

    if (existingIndex >= 0) {
      updatedPlan = [...plan];
      updatedPlan[existingIndex] = {
        ...updatedPlan[existingIndex],
        weekNumber: targetWeek,
        aiExplanationCache: cachedExplanation || updatedPlan[existingIndex].aiExplanationCache,
      };
    } else {
      updatedPlan = [{
        id: `plan-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        topicId: topic.id,
        topic,
        weekNumber: targetWeek,
        status: 'planned',
        notes: '',
        addedAt: new Date().toISOString(),
        aiExplanationCache: cachedExplanation,
      }, ...plan];
    }

    setPlan(updatedPlan);
    saveStoredPlan(updatedPlan);
  };

  const updateStatus = (itemId: string, status: WeeklyPlanItem['status']) => {
    const updated = plan.map((item) => item.id === itemId ? {
      ...item,
      status,
      completedAt: status === 'mastered' || status === 'applied' ? new Date().toISOString() : item.completedAt,
    } : item);
    setPlan(updated);
    saveStoredPlan(updated);
  };

  const updateNotes = (itemId: string, notes: string) => {
    const updated = plan.map((item) => item.id === itemId ? { ...item, notes } : item);
    setPlan(updated);
    saveStoredPlan(updated);
  };

  const removePlanItem = (itemId: string) => {
    const updated = plan.filter((item) => item.id !== itemId);
    setPlan(updated);
    saveStoredPlan(updated);
  };

  const createTopic = (topic: GrowthTopic) => {
    const updated = [topic, ...topics];
    setTopics(updated);
    saveStoredTopics(updated);
  };

  const saveProductContext = (context: string) => {
    const updated = { ...prefs, productContext: context };
    setPrefs(updated);
    saveStoredPrefs(updated);
  };

  const plannedTopicIds = plan.map((item) => item.topicId);
  const masteredCount = plan.filter((item) => item.status === 'mastered' || item.status === 'applied').length;

  return (
    <div className="min-h-screen pb-16 text-slate-100">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} masteredCount={masteredCount} totalPlannedCount={plan.length} openProductContextModal={() => setIsContextOpen(true)} productContext={prefs.productContext} />

      <main className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {activeTab === 'roulette' && <TechForWebDiscover topics={topics} onExplain={setExplainTopic} onAddToPlan={(topic) => handleAddToPlan(topic, undefined, prefs.currentWeek)} onStartChallenge={setChallengeTopic} bookmarkedIds={prefs.bookmarkedTopicIds} onToggleBookmark={handleToggleBookmark} plannedTopicIds={plannedTopicIds} onOpenLibrary={() => setActiveTab('library')} />}
        {activeTab === 'planner' && <StudyPlanner plan={plan} allTopics={topics} onUpdateItemStatus={updateStatus} onUpdateItemNotes={updateNotes} onRemoveItem={removePlanItem} onExplainTopic={setExplainTopic} onOpenLibraryToSelect={(weekNumber) => { setTargetWeekForAdd(weekNumber); setActiveTab('library'); }} />}
        {activeTab === 'library' && <TopicLibrary topics={topics} onExplain={setExplainTopic} onAddToPlan={(topic) => handleAddToPlan(topic, undefined, targetWeekForAdd)} onStartChallenge={setChallengeTopic} bookmarkedIds={prefs.bookmarkedTopicIds} onToggleBookmark={handleToggleBookmark} plannedTopicIds={plannedTopicIds} onOpenCreateTopicModal={() => setIsNewTopicOpen(true)} />}
      </main>

      <AiDeepDiveModal topic={explainTopic} onClose={() => setExplainTopic(null)} onAddToPlan={(topic, cache) => handleAddToPlan(topic, cache, prefs.currentWeek)} onStartChallenge={setChallengeTopic} productContext={prefs.productContext} isInPlan={explainTopic ? plannedTopicIds.includes(explainTopic.id) : false} />
      <CaseChallengeModal topic={challengeTopic} onClose={() => setChallengeTopic(null)} />
      <NewTopicModal isOpen={isNewTopicOpen} onClose={() => setIsNewTopicOpen(false)} onCreateTopic={createTopic} />
      <ProductContextModal isOpen={isContextOpen} onClose={() => setIsContextOpen(false)} productContext={prefs.productContext} onSaveProductContext={saveProductContext} />

      <footer className="mx-auto mt-16 max-w-7xl border-t border-white/10 px-4 pt-8 text-center text-xs text-slate-500">
        TechForWeb Learning Lab · aprender, aplicar e explicar melhor.
      </footer>
    </div>
  );
}
