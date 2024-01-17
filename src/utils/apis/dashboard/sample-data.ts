import { IDashboardData, IQuestionnaireData } from './types';

export const sampleDashboardData: IDashboardData = {
  questioner_all: 83,
  questioner_need_assess: 82,
  questioner_this_month: 10,
  patient_all: 86,
};

export const sampleChartData: IQuestionnaireData[] = [
  {
    month: 'januari',
    count: 10,
  },
  {
    month: 'februari',
    count: 0,
  },
  {
    month: 'maret',
    count: 0,
  },
  {
    month: 'april',
    count: 0,
  },
  {
    month: 'mei',
    count: 0,
  },
  {
    month: 'juni',
    count: 0,
  },
  {
    month: 'juli',
    count: 0,
  },
  {
    month: 'agustus',
    count: 0,
  },
  {
    month: 'september',
    count: 0,
  },
  {
    month: 'oktober',
    count: 0,
  },
  {
    month: 'november',
    count: 0,
  },
  {
    month: 'desember',
    count: 0,
  },
];
