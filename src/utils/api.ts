export type QuestionaireState = {
  data: any[];
  loading: boolean;
  error: string | null;
  getQuestionaire: () => Promise<void>;
  postQuestionaire: (newData: any) => Promise<void>;
  validateQuestionaire: (validateData: any) => Promise<void>;
};

export type UserState = {
  data: any[];
  loading: boolean;
  error: string | null;
  getUser: () => Promise<void>;
  getList: () => Promise<void>;
  postUser: (data: any) => Promise<void>;
  postDeactivate: (data: any) => Promise<void>;
  putUser: (data: any) => Promise<void>;
};

export type AuthState = {
  data: [] | any;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
};
