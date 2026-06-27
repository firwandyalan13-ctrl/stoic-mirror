import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { CohortStats, DimScores } from '../types';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

function getClient(): SupabaseClient | null {
  if (!url || !key) return null;
  if (!client) {
    client = createClient(url, key);
  }
  return client;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(url && key);
}

export async function saveResponse(scores: DimScores): Promise<void> {
  const supabase = getClient();
  if (!supabase) return;

  const { error } = await supabase.from('responses').insert({
    d1: scores.d1,
    d2: scores.d2,
    d3: scores.d3,
    d4: scores.d4,
    d5: scores.d5,
  });

  if (error) throw error;
}

export async function fetchCohortStats(): Promise<CohortStats | null> {
  const supabase = getClient();
  if (!supabase) return null;

  const { data, error } = await supabase.from('responses').select('d1, d2, d3, d4, d5');

  if (error) throw error;
  if (!data || data.length === 0) return null;

  const n = data.length;
  const sum = { d1: 0, d2: 0, d3: 0, d4: 0, d5: 0 };

  for (const row of data) {
    sum.d1 += row.d1;
    sum.d2 += row.d2;
    sum.d3 += row.d3;
    sum.d4 += row.d4;
    sum.d5 += row.d5;
  }

  return {
    n,
    avg_d1: Math.round((sum.d1 / n) * 100) / 100,
    avg_d2: Math.round((sum.d2 / n) * 100) / 100,
    avg_d3: Math.round((sum.d3 / n) * 100) / 100,
    avg_d4: Math.round((sum.d4 / n) * 100) / 100,
    avg_d5: Math.round((sum.d5 / n) * 100) / 100,
  };
}
