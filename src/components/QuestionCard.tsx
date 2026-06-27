import { DIM_META } from '../data/questions';
import type { Question } from '../types';

type QuestionCardProps = {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedIndex: number | undefined;
  onSelect: (optionIndex: number) => void;
};

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedIndex,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="animate-fade-in" key={question.id}>
      <div className="mb-8 flex items-baseline justify-between gap-4">
        <span className="text-bronze text-sm tracking-wide">
          {DIM_META[question.dim].name}
        </span>
        <span className="text-sm text-ink-muted">
          {questionNumber} / {totalQuestions}
        </span>
      </div>

      <h2 className="font-serif text-2xl leading-snug font-medium text-ink md:text-[1.65rem]">
        {question.text}
      </h2>

      <fieldset className="mt-10 space-y-3">
        <legend className="sr-only">{question.text}</legend>
        {question.options.map((option, index) => {
          const selected = selectedIndex === index;
          return (
            <label
              key={index}
              className={`block cursor-pointer rounded-sm border px-5 py-4 transition-colors ${
                selected
                  ? 'border-pine bg-pine text-paper shadow-sm'
                  : 'border-divider bg-paper-card text-ink hover:border-bronze-soft'
              }`}
            >
              <input
                type="radio"
                name={`q-${question.id}`}
                value={index}
                checked={selected}
                onChange={() => onSelect(index)}
                className="sr-only"
              />
              <span className="leading-relaxed">{option}</span>
            </label>
          );
        })}
      </fieldset>
    </div>
  );
}
