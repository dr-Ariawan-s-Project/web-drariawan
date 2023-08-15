export type QuestionaireState = {
    data: any[]; 
    loading: boolean;
    error: string | null;
    getQuestionaire: () => Promise<void>;
    postQuestionaire: (newData: any) => Promise<void>
    validateQuestionaire: (validateData: any) => Promise<void>
}