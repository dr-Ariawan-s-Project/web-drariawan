import axiosWithConfig from '@/utils/apis/axiosWithConfig';
import { Request, Response } from '@/utils/types/api';
import { buildQueryString } from '@/utils/formatter';
import { IPatient, IUser } from './types';

export const getUsers = async (params?: Request) => {
  try {
    const query = buildQueryString(params);
    const url = query ? `/v1/user/list${query}&rp=10` : '/v1/user/list';

    const response = await axiosWithConfig.get(url);

    return response.data as Response<IUser[]>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const getPatients = async (params?: Request) => {
  try {
    const query = buildQueryString(params);
    const url = query ? `/v1/patients${query}&limit=10` : '/v1/patients';

    const response = await axiosWithConfig.get(url);

    return response.data as Response<IPatient[]>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};
