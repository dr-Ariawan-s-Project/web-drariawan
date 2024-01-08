import axiosWithConfig from '@/utils/apis/axiosWithConfig';
import { Response } from '@/utils/types/api';
import { IBookPayload, IMySchedule, IScheduleResponse } from './types';

export const getListSchedule = async () => {
  try {
    const response = await axiosWithConfig.get(`/v1/schedule/list`);

    return response.data as Response<IScheduleResponse[]>;
  } catch (error: any) {
    const { code, message } = error.response.data.meta;

    throw Error(`${code}: ${message}`);
  }
};

export const postBookSchedule = async (body: IBookPayload) => {
  try {
    const response = await axiosWithConfig.post(`/v1/booking`, body);

    return response.data as Response;
  } catch (error: any) {
    const { code, message } = error.response.data.meta;

    throw Error(`${code}: ${message}`);
  }
};

export const getMySchedule = async (id: string) => {
  try {
    const response = await axiosWithConfig.get(
      `v1/booking/patients?patient_id=${id}`
    );

    return response.data as Response<IMySchedule[]>;
  } catch (error: any) {
    const { code, message } = error.response.data.meta;

    throw Error(`${code}: ${message}`);
  }
};
