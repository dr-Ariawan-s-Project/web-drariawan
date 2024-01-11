export interface IDashboardData {
  patient_all: number;
  questioner_all: number;
  questioner_need_assess: number;
  questioner_this_month: number;
}

export interface IQuestionnaireData {
  month: string;
  count: number;
}
