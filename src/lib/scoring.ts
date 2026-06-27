import { questions, DIM_META, DIM_ORDER } from '../data/questions';
import type { Answers, Dim, DimScores, Tier } from '../types';

export function scoreByDim(answers: Answers): DimScores {
  const score: DimScores = { d1: 0, d2: 0, d3: 0, d4: 0, d5: 0 };
  for (const q of questions) {
    const idx = answers[q.id];
    if (idx !== undefined) {
      score[q.dim] += idx + 1;
    }
  }
  return score;
}

export function pctOf(dim: Dim, score: number): number {
  return score / DIM_META[dim].max;
}

export function tierOf(dim: Dim, score: number): Tier {
  const pct = pctOf(dim, score);
  if (pct >= 0.8) return 'strong';
  if (pct >= 0.55) return 'mid';
  return 'growth';
}

export function lowestDim(score: DimScores): Dim {
  return DIM_ORDER.reduce(
    (lo, d) => (pctOf(d, score[d]) < pctOf(lo, score[lo]) ? d : lo),
    DIM_ORDER[0],
  );
}

export function tierLabel(tier: Tier): string {
  switch (tier) {
    case 'strong':
      return '较稳';
    case 'mid':
      return '进行中';
    case 'growth':
      return '可练';
  }
}
