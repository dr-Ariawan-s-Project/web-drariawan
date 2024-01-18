import { IBookPayload, IMySchedule, ISchedule, ScheduleSchema } from './types';
import { Request, Response, ResponsePagination } from '@/utils/types/api';
import axiosWithConfig from '@/utils/apis/axiosWithConfig';
import { buildQueryString } from '@/utils/formatter';

export const getSchedules = async (params?: Request) => {
  try {
    const query = buildQueryString(params);
    const url = query ? `/v1/schedule/list${query}` : '/v1/schedule/list';

    const response = await axiosWithConfig.get(url);

    return response.data as ResponsePagination<ISchedule[]>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const postSchedule = async (body: ScheduleSchema) => {
  try {
    const response = await axiosWithConfig.post('/v1/schedule', body);

    return response.data as Response;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const updateSchedule = async (
  body: ScheduleSchema,
  schedule_id: number
) => {
  try {
    const response = await axiosWithConfig.put(
      `/v1/schedule?id=${schedule_id}`,
      body
    );

    return response.data as Response;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const deleteSchedule = async (schedule_id: number) => {
  try {
    const response = await axiosWithConfig.delete(
      `/v1/schedule/delete?id=${schedule_id}`
    );

    return response.data as Response;
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
