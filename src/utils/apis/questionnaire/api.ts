import axiosWithConfig from '@/utils/apis/axiosWithConfig';
import { Response } from '@/utils/types/api';
import { QuestionnaireSchema } from './types';

export const validateQuestionaire = async (body: QuestionnaireSchema) => {
  try {
    const response = await axiosWithConfig.post(
      `/v1/questioner/validate`,
      body
    );

    return response.data as Response<string>;
  } catch (error: any) {
    const { code, message } = error.response.data.meta;

    throw Error(`${code}: ${message}`);
  }
};
