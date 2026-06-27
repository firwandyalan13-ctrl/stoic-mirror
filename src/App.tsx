import { CoverPage } from './components/CoverPage';
import { QuizPage } from './components/QuizPage';
import { ResultsPage } from './components/ResultsPage';
import { useQuiz } from './hooks/useQuiz';

export default function App() {
  const {
    phase,
    currentQuestion,
    currentIndex,
    totalQuestions,
    answers,
    scores,
    progress,
    start,
    answer,
    restart,
  } = useQuiz();

  if (phase === 'cover') {
    return <CoverPage onStart={start} />;
  }

  if (phase === 'quiz' && currentQuestion) {
    return (
      <QuizPage
        question={currentQuestion}
        questionNumber={currentIndex + 1}
        totalQuestions={totalQuestions}
        progress={progress}
        selectedIndex={answers[currentQuestion.id]}
        onSelect={(optionIndex) => answer(currentQuestion.id, optionIndex)}
      />
    );
  }

  if (phase === 'results' && scores) {
    return <ResultsPage scores={scores} onRestart={restart} />;
  }

  return null;
}
