import { useEffect, useState } from 'react';
import { DIM_META, DIM_ORDER } from '../data/questions';
import { fetchCohortStats } from '../lib/supabase';
import { pctOf } from '../lib/scoring';
import type { CohortStats, DimScores } from '../types';

type CohortComparisonProps = {
  scores: DimScores;
};

type LoadState = 'loading' | 'empty' | 'ready' | 'error';

export function CohortComparison({ scores }: CohortComparisonProps) {
  const [state, setState] = useState<LoadState>('loading');
  const [stats, setStats] = useState<CohortStats | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchCohortStats();
        if (cancelled) return;
        if (!data || data.n === 0) {
          setState('empty');
        } else {
          setStats(data);
          setState('ready');
        }
      } catch {
        if (!cancelled) setState('error');
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [scores]);

  return (
    <section aria-labelledby="cohort-heading" className="border-divider border-t pt-10">
      <h2 id="cohort-heading" className="font-serif text-2xl font-semibold text-pine">
        群体参照
      </h2>

      {state === 'loading' && (
        <p className="mt-4 text-ink-muted">正在读取群体数据…</p>
      )}

      {state === 'empty' && (
        <p className="mt-4 text-ink-muted">还在等第一批人照镜子…</p>
      )}

      {state === 'error' && (
        <p className="mt-4 text-ink-muted">群体数据暂时无法加载，你的个人镜像仍然有效。</p>
      )}

      {state === 'ready' && stats && (
        <>
          <p className="text-bronze mt-3 text-sm">已有 {stats.n} 人照过这面镜子</p>
          <p className="mt-2 text-sm text-ink-muted">
            这是参照，不是名次——看看此刻的人们大致在哪，以及你在哪。
          </p>

          <div className="mt-4 flex items-center gap-4 text-xs text-ink-muted">
            <span className="flex items-center gap-1.5">
              <span className="bg-bronze inline-block h-2.5 w-2.5 rounded-sm" aria-hidden />
              群体平均
            </span>
            <span className="flex items-center gap-1.5">
              <span className="bg-pine inline-block h-3 w-0.5" aria-hidden />你
            </span>
          </div>

          <div className="mt-6 space-y-5">
            {DIM_ORDER.map((dim) => {
              const avgKey = `avg_${dim}` as keyof CohortStats;
              const avg = stats[avgKey] as number;
              const yours = scores[dim];
              const max = DIM_META[dim].max;
              const avgPct = (avg / max) * 100;
              const yourPct = pctOf(dim, yours) * 100;

              return (
                <div key={dim}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="text-ink-secondary">{DIM_META[dim].name}</span>
                  </div>
                  <div className="bg-divider relative h-3 w-full overflow-hidden rounded-sm">
                    <div
                      className="bg-bronze absolute top-0 left-0 h-full rounded-sm transition-[width] duration-500 ease-out"
                      style={{ width: `${avgPct}%` }}
                      aria-hidden
                    />
                    <div
                      className="bg-pine absolute top-0 h-full w-0.5 -translate-x-1/2 transition-[left] duration-500 ease-out"
                      style={{ left: `${yourPct}%` }}
                      aria-hidden
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
