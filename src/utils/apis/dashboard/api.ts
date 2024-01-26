import axiosWithConfig from '@/utils/apis/axiosWithConfig';
import { Response } from '@/utils/types/api';
import { IQuestionnaireData, IDashboardData } from './types';

export const getDashboardData = async () => {
  try {
    const response = await axiosWithConfig.get('/v1/dashboard');

    return response.data as Response<IDashboardData>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const getChartData = async () => {
  try {
    const response = await axiosWithConfig.get('/v1/dashboard/questioner');

    return response.data as Response<IQuestionnaireData[]>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};
