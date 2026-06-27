import { DIM_LABELS, DIM_META, DIM_ORDER } from '../data/questions';
import { pctOf } from '../lib/scoring';
import type { DimScores } from '../types';

type MirrorSignatureProps = {
  scores: DimScores;
};

const SIZE = 280;
const CENTER = SIZE / 2;
const RADIUS = 100;
const LEVELS = 4;

function polar(angle: number, radius: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function polygonPoints(values: number[]) {
  return values
    .map((v, i) => {
      const angle = (360 / values.length) * i;
      const { x, y } = polar(angle, RADIUS * v);
      return `${x},${y}`;
    })
    .join(' ');
}

export function MirrorSignature({ scores }: MirrorSignatureProps) {
  const values = DIM_ORDER.map((d) => pctOf(d, scores[d]));
  const n = DIM_ORDER.length;

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, rgba(236,231,220,0) 70%)',
        }}
        aria-hidden
      />
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="mx-auto w-full max-w-[280px]"
        role="img"
        aria-label="五维练习程度雷达图"
      >
        <defs>
          <linearGradient id="mirrorFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2f4538" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#9a6b3f" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="mirrorStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2f4538" />
            <stop offset="100%" stopColor="#9a6b3f" />
          </linearGradient>
        </defs>

        {Array.from({ length: LEVELS }, (_, li) => {
          const level = (li + 1) / LEVELS;
          const pts = Array.from({ length: n }, (_, i) => {
            const angle = (360 / n) * i;
            const { x, y } = polar(angle, RADIUS * level);
            return `${x},${y}`;
          }).join(' ');
          return (
            <polygon
              key={li}
              points={pts}
              fill="none"
              stroke="#c9c1b1"
              strokeWidth={li === LEVELS - 1 ? 1.2 : 0.6}
              opacity={0.7}
            />
          );
        })}

        {DIM_ORDER.map((d, i) => {
          const angle = (360 / n) * i;
          const outer = polar(angle, RADIUS + 18);
          const inner = polar(angle, RADIUS);
          return (
            <g key={d}>
              <line x1={CENTER} y1={CENTER} x2={inner.x} y2={inner.y} stroke="#c9c1b1" strokeWidth={0.6} />
              <text
                x={outer.x}
                y={outer.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-ink-secondary text-[10px]"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                {DIM_LABELS[d]}
              </text>
            </g>
          );
        })}

        <polygon
          points={polygonPoints(values)}
          fill="url(#mirrorFill)"
          stroke="url(#mirrorStroke)"
          strokeWidth={2}
          className="transition-[opacity] duration-500"
        />

        {values.map((v, i) => {
          const angle = (360 / n) * i;
          const { x, y } = polar(angle, RADIUS * v);
          return <circle key={i} cx={x} cy={y} r={3.5} fill="#2f4538" />;
        })}
      </svg>

      <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-ink-muted">
        {DIM_ORDER.map((d) => (
          <span key={d}>
            {DIM_META[d].name} {scores[d]}/{DIM_META[d].max}
          </span>
        ))}
      </div>
    </div>
  );
}
