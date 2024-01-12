import { create } from 'zustand';

import { IAnswer, IChoice } from '../apis/questionnaire/types';

interface AuthState {
  answers: IAnswer[];
  selectedOption: IChoice | null;
  addAnswer: (answer: IAnswer[]) => void;
  changeSelectedOption: (option: IChoice) => void;
  resetSelectedOption: (answer: IAnswer) => void;
}

const useQuestionnaireStore = create<AuthState>()((set) => ({
  answers: [],
  selectedOption: null,
  addAnswer: (answer) =>
    set((state) => ({ answers: [...state.answers, ...answer] })),
  changeSelectedOption: (option) => set(() => ({ selectedOption: option })),
  resetSelectedOption: (answer: IAnswer) =>
    set((state) => {
      const updateAnswers = state.answers.map((item) =>
        item.question_id === answer.question_id ? answer : item
      );

      return { selectedOption: null, answers: updateAnswers };
    }),
}));

export default useQuestionnaireStore;
