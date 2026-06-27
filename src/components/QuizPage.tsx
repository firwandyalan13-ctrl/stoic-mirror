import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import type { Question } from '../types';

type QuizPageProps = {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  progress: number;
  selectedIndex: number | undefined;
  onSelect: (optionIndex: number) => void;
};

export function QuizPage({
  question,
  questionNumber,
  totalQuestions,
  progress,
  selectedIndex,
  onSelect,
}: QuizPageProps) {
  return (
    <main className="mx-auto min-h-dvh max-w-2xl px-6 py-10">
      <ProgressBar progress={progress} />
      <div className="mt-12">
        <QuestionCard
          question={question}
          questionNumber={questionNumber}
          totalQuestions={totalQuestions}
          selectedIndex={selectedIndex}
          onSelect={onSelect}
        />
      </div>
    </main>
  );
}
