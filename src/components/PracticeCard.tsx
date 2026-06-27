import { practice } from '../data/practice';
import { DIM_META } from '../data/questions';
import type { Dim } from '../types';

type PracticeCardProps = {
  dim: Dim;
};

export function PracticeCard({ dim }: PracticeCardProps) {
  const item = practice[dim];

  return (
    <section
      aria-labelledby="practice-heading"
      className="bg-pine rounded-sm px-6 py-8 text-paper md:px-8 md:py-10"
    >
      <p className="text-bronze-soft text-sm tracking-wide">此刻最值得练的一栏</p>
      <h2 id="practice-heading" className="font-serif mt-2 text-2xl font-semibold">
        {item.title}
      </h2>
      <p className="mt-1 text-sm text-paper/70">{DIM_META[dim].name}</p>
      <p className="mt-6 leading-relaxed text-paper/90">{item.body}</p>
    </section>
  );
}
