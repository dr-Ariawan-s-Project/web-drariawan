import { Request, Response, ResponsePagination } from '@/utils/types/api';
import axiosWithConfig from '@/utils/apis/axiosWithConfig';
import { buildQueryString } from '@/utils/formatter';
import { IPatient, MyProfile, PatientSchema } from './types';

export const getPatients = async (params?: Request) => {
  try {
    const query = buildQueryString(params);
    const url = query ? `/v1/patients${query}` : '/v1/patients';

    const response = await axiosWithConfig.get(url);

    return response.data as ResponsePagination<IPatient[]>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const postPatient = async (body: PatientSchema) => {
  try {
    const response = await axiosWithConfig.post(`/v1/patients`, body);

    // TODO: Change response when it is known
    return response.data as Response;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const updatePatient = async (
  body: PatientSchema,
  patient_id: string
) => {
  try {
    const response = await axiosWithConfig.put(
      `/v1/patients/${patient_id}`,
      body
    );

    // TODO: Change response when it is known
    return response.data as Response;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const deletePatient = async (id_patient: string) => {
  try {
    const response = await axiosWithConfig.delete(`/v1/patients/${id_patient}`);

    return response.data as Response<null>;
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
