import { ScheduleData, UserData, PatientDataProps, RoleData } from '../utils/component';
import { Answer } from './data';



export type QuestionaireState = {
  data: any;
  loading: boolean;
  error: string | null;
  getQuestionaire: (token: string) => Promise<void>;
  postQuestionaire: (code_attempt: string, answer: []) => Promise<void>;
  validateQuestionaire: (validateData: any) => Promise<void>;
  getAttempts: (token: string, userRole: string) => Promise<void>;
  getAnswers: (token: string, attempt_id: string) => Promise<Answer[]>;
  postAssessment: (token: string, attempt_id: string, data: string) => Promise<void>;
};

export type UserState = {
  data: any[];
  loading: boolean;
  error: string | null;
  getUser: (page: number, limit: number, token: string) => Promise<void>;
  getList: (page: number, limit: number, token: string) => Promise<void>;
  postUser: (
    userData: any,
    selectedUser: { id: any; name: any },
    token: string
  ) => Promise<void>;
  postDeactivate: (data: any, token: string) => Promise<void>;
  putUser: (userData: any, token: string) => Promise<void>;
};


export type AuthState = {
  data: RoleData | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
};

export type PatientState = {
  data: any[];
  loading: boolean;
  error: string | null;
  loginPatient: (email: string, password: string) => Promise<void>;
  getPatient: (page: number,limit: number,token: string,
  ) => Promise<void>;
  postPatient: (patientData: PatientDataProps, token: string) => Promise<void>;
  putPatient: (patientId: number,patientData: PatientDataProps,token: string
  ) => Promise<void>;
  getPatientById: (patientId: string, token: string) => Promise<any>;
  getList: (token: string) => Promise<void>;
  deletePatient: (patientId: number, token: string) => Promise<void>;
};

export type DashboardState = {
  data: {
    patient_all: number;
    questioner_all: number;
    questioner_need_assess: number;
    questioner_this_month: number;
  };
  loading: boolean;
  error: string | null;
  getDashboard: (token: string | undefined) => Promise<void>;
};


export type ScheduleState = {
  data: any[];
  loading: boolean;
  error: string | null;
  getSchedules: (page: number, limit: number, token: string) => Promise<void>;
  postSchedule: (
    scheduleData: ScheduleData,
    selectedUser: UserData,
    token: string
  ) => Promise<void>;
  putSchedule: (scheduleId: number, scheduleData: ScheduleData, token: string) => Promise<void>;
  deleteSchedule: (scheduleId: number, token: string) => Promise<void>;
};
export type { RoleData };

