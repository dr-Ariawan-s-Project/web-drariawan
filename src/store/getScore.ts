import { create } from "zustand";

import { ScoreState } from "../utils/data";

export const useScore = create<ScoreState>((set) => ({
    id: 0,
    score: 0,
    getScore: (score: number | void, id: number | void) => {
      set({
        id: localStorage.setItem('id', JSON.stringify(id)),
        score: localStorage.setItem('score', JSON.stringify(score))
      })
    },
}))