type CoverPageProps = {
  onStart: () => void;
};

export function CoverPage({ onStart }: CoverPageProps) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-6 py-16">
      <p className="text-bronze text-sm tracking-widest uppercase">Stoic Practice Mirror</p>
      <h1 className="font-serif mt-4 text-4xl leading-tight font-semibold text-pine md:text-5xl">
        斯多葛实践镜
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-secondary">
        一面镜子，照出你此刻在五个维度的练习程度——不是类型，不是排名。
      </p>

      <blockquote className="border-divider mt-12 border-l-2 pl-5">
        <p className="font-serif text-xl leading-relaxed text-ink italic">
          「困扰我们的不是事情本身，而是我们对事情的看法。」
        </p>
        <footer className="mt-3 text-sm text-ink-muted">— Epictetus · 愛比克泰德</footer>
      </blockquote>

      <button
        type="button"
        onClick={onStart}
        className="mt-14 w-full rounded-sm bg-pine px-6 py-4 text-base font-medium text-paper transition-colors hover:bg-pine-deep focus-visible:ring-2 focus-visible:ring-pine focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        开始照镜子
      </button>

      <p className="mt-6 text-center text-sm text-ink-muted">18 题 · 约 5 分钟 · 完全匿名</p>
    </main>
  );
}
