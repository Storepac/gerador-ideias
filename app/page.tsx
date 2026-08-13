'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { RandomWheel } from '@/components/RandomWheel';
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
import { Rocket, Sparkles, BookOpen, Target, Heart } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'roulette' | 'planner' | 'library'>('roulette');
  const [topics, setTopics] = useState<GrowthTopic[]>(() => {
    if (typeof window !== 'undefined') return getStoredTopics();
    return INITIAL_TOPICS;
  });
  const [plan, setPlan] = useState<WeeklyPlanItem[]>(() => {
    if (typeof window !== 'undefined') return getStoredPlan();
    return [];
  });
  const [prefs, setPrefs] = useState<UserPreferences>(() => {
    if (typeof window !== 'undefined') return getStoredPrefs();
    return {
      currentWeek: 1,
      weeklyGoal: 1,
      targetCategories: [],
      productContext: '',
      bookmarkedTopicIds: [],
    };
  });

  // Modal States
  const [explainTopic, setExplainTopic] = useState<GrowthTopic | null>(null);
  const [challengeTopic, setChallengeTopic] = useState<GrowthTopic | null>(null);
  const [isNewTopicOpen, setIsNewTopicOpen] = useState<boolean>(false);
  const [isContextOpen, setIsContextOpen] = useState<boolean>(false);
  const [targetWeekForAdd, setTargetWeekForAdd] = useState<number>(1);

  // Sync state helpers
  const handleToggleBookmark = (topicId: string) => {
    const isBookmarked = prefs.bookmarkedTopicIds.includes(topicId);
    const updatedBookmarks = isBookmarked
      ? prefs.bookmarkedTopicIds.filter((id) => id !== topicId)
      : [...prefs.bookmarkedTopicIds, topicId];

    const updatedPrefs = { ...prefs, bookmarkedTopicIds: updatedBookmarks };
    setPrefs(updatedPrefs);
    saveStoredPrefs(updatedPrefs);
  };

  const handleAddToPlan = (topic: GrowthTopic, cachedExplanation?: string, weekNum?: number) => {
    const targetWeek = weekNum || prefs.currentWeek || 1;
    const existingIndex = plan.findIndex((i) => i.topicId === topic.id);

    let updatedPlan: WeeklyPlanItem[] = [];

    if (existingIndex >= 0) {
      // Update
      updatedPlan = [...plan];
      updatedPlan[existingIndex] = {
        ...updatedPlan[existingIndex],
        weekNumber: targetWeek,
        aiExplanationCache: cachedExplanation || updatedPlan[existingIndex].aiExplanationCache,
      };
    } else {
      // Insert
      const newItem: WeeklyPlanItem = {
        id: `plan-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        topicId: topic.id,
        topic,
        weekNumber: targetWeek,
        status: 'planned',
        notes: '',
        addedAt: new Date().toISOString(),
        aiExplanationCache: cachedExplanation,
      };
      updatedPlan = [newItem, ...plan];
    }

    setPlan(updatedPlan);
    saveStoredPlan(updatedPlan);
  };

  const handleUpdateItemStatus = (itemId: string, newStatus: WeeklyPlanItem['status']) => {
    const updated = plan.map((item) =>
      item.id === itemId
        ? {
            ...item,
            status: newStatus,
            completedAt: newStatus === 'mastered' || newStatus === 'applied' ? new Date().toISOString() : item.completedAt,
          }
        : item
    );
    setPlan(updated);
    saveStoredPlan(updated);
  };

  const handleUpdateItemNotes = (itemId: string, notes: string) => {
    const updated = plan.map((item) => (item.id === itemId ? { ...item, notes } : item));
    setPlan(updated);
    saveStoredPlan(updated);
  };

  const handleRemovePlanItem = (itemId: string) => {
    const updated = plan.filter((item) => item.id !== itemId);
    setPlan(updated);
    saveStoredPlan(updated);
  };

  const handleCreateTopic = (newTopic: GrowthTopic) => {
    const updatedTopics = [newTopic, ...topics];
    setTopics(updatedTopics);
    saveStoredTopics(updatedTopics);
  };

  const handleSaveProductContext = (context: string) => {
    const updatedPrefs = { ...prefs, productContext: context };
    setPrefs(updatedPrefs);
    saveStoredPrefs(updatedPrefs);
  };

  const handleOpenLibraryToSelect = (weekNumber: number) => {
    setTargetWeekForAdd(weekNumber);
    setActiveTab('library');
  };

  const plannedTopicIds = plan.map((i) => i.topicId);
  const masteredCount = plan.filter((i) => i.status === 'mastered' || i.status === 'applied').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-16">
      {/* Top Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        masteredCount={masteredCount}
        totalPlannedCount={plan.length}
        openProductContextModal={() => setIsContextOpen(true)}
        productContext={prefs.productContext}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'roulette' && (
          <RandomWheel
            topics={topics}
            onExplain={(t) => setExplainTopic(t)}
            onAddToPlan={(t) => handleAddToPlan(t, undefined, prefs.currentWeek)}
            onStartChallenge={(t) => setChallengeTopic(t)}
            bookmarkedIds={prefs.bookmarkedTopicIds}
            onToggleBookmark={handleToggleBookmark}
            plannedTopicIds={plannedTopicIds}
            onOpenLibrary={() => setActiveTab('library')}
          />
        )}

        {activeTab === 'planner' && (
          <StudyPlanner
            plan={plan}
            allTopics={topics}
            onUpdateItemStatus={handleUpdateItemStatus}
            onUpdateItemNotes={handleUpdateItemNotes}
            onRemoveItem={handleRemovePlanItem}
            onExplainTopic={(t) => setExplainTopic(t)}
            onOpenLibraryToSelect={handleOpenLibraryToSelect}
          />
        )}

        {activeTab === 'library' && (
          <TopicLibrary
            topics={topics}
            onExplain={(t) => setExplainTopic(t)}
            onAddToPlan={(t) => handleAddToPlan(t, undefined, targetWeekForAdd)}
            onStartChallenge={(t) => setChallengeTopic(t)}
            bookmarkedIds={prefs.bookmarkedTopicIds}
            onToggleBookmark={handleToggleBookmark}
            plannedTopicIds={plannedTopicIds}
            onOpenCreateTopicModal={() => setIsNewTopicOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      <AiDeepDiveModal
        topic={explainTopic}
        onClose={() => setExplainTopic(null)}
        onAddToPlan={(t, cache) => handleAddToPlan(t, cache, prefs.currentWeek)}
        onStartChallenge={(t) => setChallengeTopic(t)}
        productContext={prefs.productContext}
        isInPlan={explainTopic ? plannedTopicIds.includes(explainTopic.id) : false}
      />

      <CaseChallengeModal
        topic={challengeTopic}
        onClose={() => setChallengeTopic(null)}
      />

      <NewTopicModal
        isOpen={isNewTopicOpen}
        onClose={() => setIsNewTopicOpen(false)}
        onCreateTopic={handleCreateTopic}
      />

      <ProductContextModal
        isOpen={isContextOpen}
        onClose={() => setIsContextOpen(false)}
        productContext={prefs.productContext}
        onSaveProductContext={handleSaveProductContext}
      />

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-center text-xs text-white/40">
        <p className="flex items-center justify-center space-x-1">
          <span>Knowledge Architect Pro • Hub Estratégico de Marketing, Produto, Vendas & Growth</span>
        </p>
      </footer>
    </div>
  );
}
