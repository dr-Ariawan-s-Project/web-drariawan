export type QuestionaireState = {
  data: any;
  loading: boolean;
  error: string | null;
  getQuestionaire: () => Promise<void>;
  postQuestionaire: (code_attempt: string, answer: []) => Promise<void>;
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

export type PatientState = {
  data: any[];
  loading: boolean;
  error: string | null;
  getPatient: (page: number, limit: number) => Promise<void>;
  postPatient: (patientData: any) => Promise<void>;
  putPatient: (patientId: number, patientData: any) => Promise<void>;
  getPatientById: (patientId: string) => Promise<any>;
  getList: () => Promise<void>;
  deletePatient: (patientId: number) => Promise<void>;
};
