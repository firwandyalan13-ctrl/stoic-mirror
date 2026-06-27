import { useEffect } from 'react';
import { CLOSING_TEXT } from '../data/mirror';
import { saveResponse } from '../lib/supabase';
import { lowestDim } from '../lib/scoring';
import type { DimScores } from '../types';
import { CohortComparison } from './CohortComparison';
import { DimensionMirror } from './DimensionMirror';
import { MirrorSignature } from './MirrorSignature';
import { PracticeCard } from './PracticeCard';

type ResultsPageProps = {
  scores: DimScores;
  onRestart: () => void;
};

export function ResultsPage({ scores, onRestart }: ResultsPageProps) {
  const practiceDim = lowestDim(scores);

  useEffect(() => {
    saveResponse(scores).catch(() => {
      // Silent fail — results still valid without persistence
    });
  }, [scores]);

  return (
    <main className="mx-auto max-w-2xl px-6 py-12 pb-20">
      <header className="text-center">
        <p className="text-bronze text-sm tracking-widest uppercase">你的镜像</p>
        <h1 className="font-serif mt-3 text-3xl font-semibold text-pine md:text-4xl">
          此刻的练习程度
        </h1>
        <p className="mt-4 text-ink-secondary">
          以下是你此刻在五个维度上的分布——它会变，练习也会继续。
        </p>
      </header>

      <div className="bg-paper-card border-divider mt-12 rounded-sm border px-4 py-8 md:px-8">
        <MirrorSignature scores={scores} />
      </div>

      <div className="mt-14">
        <DimensionMirror scores={scores} />
      </div>

      <div className="mt-14">
        <PracticeCard dim={practiceDim} />
      </div>

      <blockquote className="border-divider mt-12 border-l-2 pl-5">
        <p className="font-serif text-lg leading-relaxed text-ink italic">{CLOSING_TEXT}</p>
      </blockquote>

      <div className="mt-14">
        <CohortComparison scores={scores} />
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="border-pine text-pine mt-14 w-full rounded-sm border-2 bg-transparent px-6 py-4 text-base font-medium transition-colors hover:bg-pine hover:text-paper focus-visible:ring-2 focus-visible:ring-pine focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        再照一次
      </button>
    </main>
  );
}
