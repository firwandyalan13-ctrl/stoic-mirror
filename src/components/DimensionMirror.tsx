import { mirror } from '../data/mirror';
import { DIM_META, DIM_ORDER } from '../data/questions';
import { pctOf, tierLabel, tierOf } from '../lib/scoring';
import type { DimScores } from '../types';

type DimensionMirrorProps = {
  scores: DimScores;
};

export function DimensionMirror({ scores }: DimensionMirrorProps) {
  return (
    <section aria-labelledby="mirror-heading">
      <h2 id="mirror-heading" className="font-serif text-2xl font-semibold text-pine">
        现状镜像
      </h2>
      <p className="mt-2 text-sm text-ink-muted">以下是你此刻在五个维度上的练习程度</p>

      <div className="mt-8 space-y-8">
        {DIM_ORDER.map((dim) => {
          const score = scores[dim];
          const pct = pctOf(dim, score);
          const tier = tierOf(dim, score);
          const pctDisplay = Math.round(pct * 100);

          return (
            <article key={dim} className="border-divider border-b pb-8 last:border-b-0">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-serif text-lg font-medium text-ink">
                  {DIM_META[dim].name}
                </h3>
                <span className="text-bronze text-sm">{tierLabel(tier)}</span>
              </div>

              <div className="mt-3">
                <div className="bg-divider h-1.5 w-full overflow-hidden rounded-full">
                  <div
                    className="bg-pine h-full rounded-full transition-[width] duration-500 ease-out"
                    style={{ width: `${pctDisplay}%` }}
                    role="progressbar"
                    aria-valuenow={pctDisplay}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${DIM_META[dim].name} ${pctDisplay}%`}
                  />
                </div>
                <p className="mt-1 text-right text-xs text-ink-muted">
                  {score} / {DIM_META[dim].max}
                </p>
              </div>

              <p className="mt-4 leading-relaxed text-ink-secondary">{mirror[dim][tier]}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
