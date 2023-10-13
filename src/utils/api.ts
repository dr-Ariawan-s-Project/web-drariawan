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
  loginPatient: (email: string, password: string) => void;
  getPatient: (page: number, limit: number) => Promise<void>;
  postPatient: (
    name: string,
    email: string,
    password: string,
    nik: string | number,
    dob: string,
    phone: string | number,
    gender: string,
    marriage_status: string,
    nationality: string,
    partner_option: string,
    partner_email: string
  ) => Promise<void>;
  putPatient: (patientId: number, patientData: any) => Promise<void>;
  getPatientById: (patientId: string) => Promise<any>;
  getList: () => Promise<void>;
  deletePatient: (patientId: number) => Promise<void>;
};
