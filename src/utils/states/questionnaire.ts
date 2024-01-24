import { type StateCreator } from "zustand";

import { IAnswer, IChoice } from "../apis/questionnaire/types";

export interface QuestionnaireStore {
  answers: IAnswer[];
  selectedOption: IChoice | null;
  currentIdQuestion: number;
  addAnswer: (answer: IAnswer[]) => void;
  setCurrentIdQuestion: (id_question: number) => void;
  setSelectedOption: (option: IChoice) => void;
  resetSelectedOption: (answer: IAnswer) => void;
}

export const questionnaireStoreCreator: StateCreator<QuestionnaireStore> = (
  set
) => ({
  answers: JSON.parse(localStorage.getItem("dataTemp") || "[]"),
  selectedOption: null,
  currentIdQuestion: JSON.parse(localStorage.getItem("idTemp") || "1"),
  addAnswer: (answer) =>
    set(() => {
      const getDataTemp: IAnswer[] = JSON.parse(
        localStorage.getItem("dataTemp") || "[]"
      );

      if (getDataTemp.length === answer.length) {
        return { answers: getDataTemp };
      } else {
        localStorage.setItem("dataTemp", JSON.stringify(answer));
        return { answers: answer };
      }
    }),
  setCurrentIdQuestion: (id_question) =>
    set(() => {
      localStorage.setItem("idTemp", JSON.stringify(id_question));
      return { currentIdQuestion: id_question };
    }),
  setSelectedOption: (option) => set(() => ({ selectedOption: option })),
  resetSelectedOption: (answer: IAnswer) =>
    set((state) => {
      const updateAnswers = state.answers.map((item) =>
        item.question_id === answer.question_id ? answer : item
      );

      localStorage.setItem("dataTemp", JSON.stringify(updateAnswers));
      return { selectedOption: null, answers: updateAnswers };
    }),
});
