export type Dim = 'd1' | 'd2' | 'd3' | 'd4' | 'd5';

export type Tier = 'strong' | 'mid' | 'growth';

export type Question = {
  id: number;
  dim: Dim;
  text: string;
  options: [string, string, string, string];
};

export type DimScores = Record<Dim, number>;

export type Answers = Record<number, number>;

export type CohortStats = {
  n: number;
  avg_d1: number;
  avg_d2: number;
  avg_d3: number;
  avg_d4: number;
  avg_d5: number;
};

export type AppPhase = 'cover' | 'quiz' | 'results';
