import axiosWithConfig from '@/utils/apis/axiosWithConfig';
import { Response } from '@/utils/types/api';
import { LoginSchema, RegisterSchema } from './types';

export interface IUserPayload {
  token: string;
  name: string;
}

export interface IAdminPayload extends IUserPayload {
  role: string;
}

export const userLogin = async (body: LoginSchema) => {
  try {
    const response = await axiosWithConfig.post(`/v1/patients/login`, body);

    return response.data as Response<IUserPayload>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const adminLogin = async (body: LoginSchema) => {
  try {
    const response = await axiosWithConfig.post(`/login`, body);

    return response.data as Response<IAdminPayload>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const userRegister = async (body: RegisterSchema) => {
  try {
    const response = await axiosWithConfig.post(`/v1/patients`, body);

    // TODO: Change response when it is known
    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
