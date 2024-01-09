import axiosWithConfig from '@/utils/apis/axiosWithConfig';
import { Response } from '@/utils/types/api';
import { LoginSchema, MyProfile, RegisterSchema } from './types';

export interface IUserPayload {
  token: string;
  name: string;
  role: string;
}

export const userLogin = async (body: LoginSchema) => {
  try {
    const response = await axiosWithConfig.post(`/v1/patients/login`, body);

    return response.data as Response<IUserPayload>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const adminLogin = async (body: LoginSchema) => {
  try {
    const response = await axiosWithConfig.post(`/login`, body);

    return response.data as Response<IUserPayload>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const userRegister = async (body: RegisterSchema) => {
  try {
    const response = await axiosWithConfig.post(`/v1/patients`, body);

    // TODO: Change response when it is known
    return response.data as Response;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const getMyProfile = async () => {
  try {
    const response = await axiosWithConfig.get(`/v1/patients/profile`);

    return response.data as Response<MyProfile>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};
