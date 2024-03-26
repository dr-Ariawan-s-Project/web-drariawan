import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { buildQueryString } from "@/utils/formatter";
import { Request, Response, ResponsePagination } from "@/utils/types/api";
import {
  AssessmentSchema,
  IAttempt,
  IAttemptAnswer,
  IQuestionnaire,
  QuestionnaireBody,
  QuestionnaireSchema,
} from "./types";

export const validateQuestionaire = async (body: QuestionnaireSchema) => {
  try {
    const response = await axiosWithConfig.post(
      "/v1/questioner/validate",
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
    const response = await axiosWithConfig.get("/v1/questioner");

    return response.data as Response<IQuestionnaire[]>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const postQuestionnaire = async (body: QuestionnaireBody) => {
  try {
    const response = await axiosWithConfig.post("/v1/questioner", body);

    return response.data as Response<null>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const getQuestionnaireAttempt = async (params?: Request) => {
  try {
    const query = buildQueryString(params);
    const url = query
      ? `/v1/questioner/attempts${query}&limit=10`
      : "/v1/questioner/attempts";

    const response = await axiosWithConfig.get(url);

    return response.data as ResponsePagination<IAttempt[]>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const getAttempt = async (attempt_id: string) => {
  try {
    const response = await axiosWithConfig.get(
      `/v1/questioner/attempts/${attempt_id}`
    );

    return response.data as Response<IAttempt>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const getAttemptAnswers = async (
  attempt_id: string,
  params?: Request
) => {
  try {
    const query = buildQueryString(params);
    const url = query
      ? `/v1/questioner/attempts/${attempt_id}/answers${query}&limit=10`
      : `/v1/questioner/attempts/${attempt_id}/answers`;

    const response = await axiosWithConfig.get(url);

    return response.data as ResponsePagination<IAttemptAnswer[]>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};

export const postAttemptAssessments = async (
  body: AssessmentSchema,
  attempt_id: string
) => {
  try {
    const response = await axiosWithConfig.post(
      `/v1/questioner/attempts/${attempt_id}/assesments`,
      body
    );

    return response.data as Response<null>;
  } catch (error: any) {
    const { messages } = error.response.data;

    throw Error(messages[0]);
  }
};
