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

export function TechForWebDiscover(props: TechForWebDiscoverProps) {
  return (
    <div className="t4w-discover-legacy">
      <RandomWheel {...props} />
      <style jsx global>{`
        .t4w-discover-legacy [class*="bg-[#c8a45d]"] {
          background-color: #2563eb !important;
        }

        .t4w-discover-legacy [class*="bg-[#c8a45d]/5"] {
          background-color: rgb(37 99 235 / 0.08) !important;
        }

        .t4w-discover-legacy [class*="bg-[#c8a45d]/10"] {
          background-color: rgb(37 99 235 / 0.12) !important;
        }

        .t4w-discover-legacy [class*="text-[#c8a45d]"],
        .t4w-discover-legacy [class*="text-[#e5c583]"] {
          color: #93c5fd !important;
        }

        .t4w-discover-legacy [class*="border-[#c8a45d]"] {
          border-color: rgb(59 130 246 / 0.32) !important;
        }

        .t4w-discover-legacy [class*="focus:border-[#c8a45d]"]:focus {
          border-color: #3b82f6 !important;
        }

        .t4w-discover-legacy [class*="shadow-[0_0_"] {
          box-shadow: 0 0 28px rgb(37 99 235 / 0.2) !important;
        }

        .t4w-discover-legacy .font-serif {
          font-family: var(--font-outfit), system-ui, sans-serif !important;
        }

        .t4w-discover-legacy > div > div:first-child > div:nth-child(3) > div:first-child {
          display: none !important;
        }

        .t4w-discover-legacy > div > div:first-child {
          background: #0b1728 !important;
          border-color: rgb(59 130 246 / 0.2) !important;
        }

        .t4w-discover-legacy > div > div:first-child h2 span {
          color: #93c5fd !important;
          font-style: normal !important;
        }

        .t4w-discover-legacy button[class*="bg-[#c8a45d]"] {
          color: #fff !important;
        }

        .t4w-discover-legacy button[class*="bg-[#c8a45d]"] svg {
          color: #fff !important;
        }
      `}</style>
    </div>
  );
}
