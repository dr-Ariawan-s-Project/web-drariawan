import axiosWithConfig from '@/utils/apis/axiosWithConfig';
import { Request, Response, ResponsePagination } from '@/utils/types/api';
import { buildQueryString } from '@/utils/formatter';
import { IUser, UserSchema } from './types';

export const getUsers = async (params?: Request) => {
  try {
    const query = buildQueryString(params);
    const url = query ? `/v1/user/list${query}` : '/v1/user/list';

    const response = await axiosWithConfig.get(url);

    return response.data as ResponsePagination<IUser[]>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const postUser = async (body: UserSchema) => {
  try {
    const response = await axiosWithConfig.post('/v1/user', body);

    return response.data as Response;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const deactivateUser = async (id_user: number) => {
  try {
    const response = await axiosWithConfig.delete(
      `/v1/user/deactive/${id_user}`
    );

    return response.data as Response<null>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const getProfile = async () => {
  try {
    const response = await axiosWithConfig.get('/v1/user/profile');

    return response.data as Response<IUser>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const updateProfile = async (body: UserSchema) => {
  try {
    const response = await axiosWithConfig.put('/v1/user', body);

    return response.data as Response;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};
