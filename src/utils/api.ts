import { ScheduleData, UserData } from '../utils/component';
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
  getUser: (page: number, limit: number) => Promise<void>;
  getList: (page: number, limit: number) => Promise<any[]>;
  postUser: (
    userData: any,
    selectedUser: { id: any; name: any }
  ) => Promise<void>;
  postDeactivate: (data: any) => Promise<void>;
  putUser: (userData: any) => Promise<void>;
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

export type DashboardState = {
  data: {
    questioner_all: number;
    questioner_need_assess: number;
    questioner_this_month: number;
  };
  loading: boolean;
  error: string | null;
  getDashboard: () => Promise<void>;
};

export type ScheduleState = {
  data: any[];
  loading: boolean;
  error: string | null;
  getSchedules: (page: number, limit: number) => Promise<void>;
  postSchedule: (
    scheduleData: ScheduleData,
    selectedUser: UserData
  ) => Promise<any>;
  putSchedule: (scheduleId: number, scheduleData: any) => Promise<void>;
  deleteSchedule: (scheduleId: number) => Promise<any>;
};
