export type ScoreState = {
    id: number | void,
    score: number | void,
    getScore: (score: number | void, id: number | void) => void,
}