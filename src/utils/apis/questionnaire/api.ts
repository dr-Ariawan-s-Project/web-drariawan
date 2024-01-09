import axiosWithConfig from '@/utils/apis/axiosWithConfig';
import { Response } from '@/utils/types/api';
import {
  IQuestionnaire,
  QuestionnaireBody,
  QuestionnaireSchema,
} from './types';

export const validateQuestionaire = async (body: QuestionnaireSchema) => {
  try {
    const response = await axiosWithConfig.post(
      '/v1/questioner/validate',
      body
    );

    return response.data as Response<string>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const getQuestionnaire = async () => {
  try {
    const response = await axiosWithConfig.get('/v1/questioner');

    return response.data as Response<IQuestionnaire[]>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const postQuestionnaire = async (body: QuestionnaireBody) => {
  try {
    const response = await axiosWithConfig.post('/v1/questioner', body);

    return response.data as Response<string>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};
