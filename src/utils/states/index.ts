import { create } from "zustand";

import { type AuthStore, authStoreCreator } from "./auth";
import {
  type QuestionnaireStore,
  questionnaireStoreCreator,
} from "./questionnaire";

export const useAuthStore = create<AuthStore>()(authStoreCreator);
export const useQuestionnaireStore = create<QuestionnaireStore>()(
  questionnaireStoreCreator
);
