import axiosWithConfig from '@/utils/apis/axiosWithConfig';
import { buildQueryString } from '@/utils/formatter';
import { Request, Response, ResponsePagination } from '@/utils/types/api';
import {
  IAttempt,
  IAttemptAnswer,
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

export const getQuestionnaires = async () => {
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
    console.log('TEST', error);
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const getQuestionnaireAttempt = async (params?: Request) => {
  try {
    const query = buildQueryString(params);
    const url = query
      ? `/v1/questioner/attempts${query}&limit=10`
      : '/v1/questioner/attempts';

    const response = await axiosWithConfig.get(url);

    return response.data as ResponsePagination<IAttempt[]>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const getAttemptAnswers = async (attempt_id: string) => {
  try {
    const response = await axiosWithConfig.get(
      `/v1/questioner/attempts/${attempt_id}/answers`
    );

    return response.data as Response<IAttemptAnswer[]>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const postAttemptAssessments = async (attempt_id: string) => {
  try {
    const response = await axiosWithConfig.post(
      `/v1/questioner/attempts/${attempt_id}/assesments`
    );

    return response.data as Response<IQuestionnaire[]>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};
