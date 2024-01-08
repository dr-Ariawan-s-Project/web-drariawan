import * as z from 'zod';

const baseSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email wajib diisi' })
    .email('Email tidak valid'),
  phone: z.string().min(1, { message: 'Nomor telepon wajib diisi' }),
});

const selfSchema = z
  .object({
    as: z.literal('myself'),
  })
  .merge(baseSchema);

const partnerSchema = z
  .object({
    as: z.literal('partner'),
    partner_email: z
      .string()
      .min(1, { message: 'Email partner wajib diisi' })
      .email('Email partner tidak valid'),
  })
  .merge(baseSchema);

export const questionnaireSchema = z.discriminatedUnion('as', [
  selfSchema,
  partnerSchema,
]);

export type QuestionnaireSchema = z.infer<typeof questionnaireSchema>;

export interface IQuestionnaire {
  choices: null | IChoice[];
  description: string;
  goto: null | number;
  id: number;
  question: string;
  section: string;
  type: 'choices' | 'text';
  url_video: string;
}

export interface IAnswer {
  question_id: number;
  description: string;
  score: number;
}

export interface IChoice {
  goto: number;
  id: number;
  option: string;
  question_id: number;
  score: number;
  slugs: string;
}

export interface QuestionnaireBody {
  code_attempt: string;
  answer: IAnswer[];
}
