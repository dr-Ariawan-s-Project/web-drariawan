import { IBookPayload, IMySchedule, ISchedule } from './types';
import axiosWithConfig from '@/utils/apis/axiosWithConfig';
import { Request, Response } from '@/utils/types/api';
import { buildQueryString } from '@/utils/formatter';

export const getSchedules = async (params?: Request) => {
  try {
    const query = buildQueryString(params);
    const url = query ? `/v1/schedule/list${query}&rp=10` : '/v1/schedule/list';

    const response = await axiosWithConfig.get(url);

    return response.data as Response<ISchedule[]>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const postBookSchedule = async (body: IBookPayload) => {
  try {
    const response = await axiosWithConfig.post(`/v1/booking`, body);

    return response.data as Response;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const getMySchedule = async (id: string) => {
  try {
    const response = await axiosWithConfig.get(
      `v1/booking/patients?patient_id=${id}`
    );

    return response.data as Response<IMySchedule[]>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};
