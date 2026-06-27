import { useReducer } from 'react';
import { questions } from '../data/questions';
import { scoreByDim } from '../lib/scoring';
import type { Answers, AppPhase, DimScores } from '../types';

type State = {
  phase: AppPhase;
  currentIndex: number;
  answers: Answers;
  scores: DimScores | null;
};

type Action =
  | { type: 'START' }
  | { type: 'ANSWER'; questionId: number; optionIndex: number }
  | { type: 'RESTART' };

const initialState: State = {
  phase: 'cover',
  currentIndex: 0,
  answers: {},
  scores: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START':
      return { ...initialState, phase: 'quiz' };

    case 'ANSWER': {
      const answers = { ...state.answers, [action.questionId]: action.optionIndex };
      const isLast = state.currentIndex >= questions.length - 1;

      if (isLast) {
        return {
          phase: 'results',
          currentIndex: state.currentIndex,
          answers,
          scores: scoreByDim(answers),
        };
      }

      return {
        ...state,
        answers,
        currentIndex: state.currentIndex + 1,
      };
    }

    case 'RESTART':
      return initialState;

    default:
      return state;
  }
}

export function useQuiz() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const currentQuestion = questions[state.currentIndex];
  const progress = state.phase === 'quiz' ? (state.currentIndex + 1) / questions.length : 0;

  return {
    phase: state.phase,
    currentQuestion,
    currentIndex: state.currentIndex,
    totalQuestions: questions.length,
    answers: state.answers,
    scores: state.scores,
    progress,
    start: () => dispatch({ type: 'START' }),
    answer: (questionId: number, optionIndex: number) =>
      dispatch({ type: 'ANSWER', questionId, optionIndex }),
    restart: () => dispatch({ type: 'RESTART' }),
  };
}
