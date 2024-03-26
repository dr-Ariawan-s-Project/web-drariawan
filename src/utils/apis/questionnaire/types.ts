import * as z from "zod";

const baseSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email wajib diisi" })
    .email("Email tidak valid"),
  phone: z.string().min(1, { message: "Nomor telepon wajib diisi" }),
});

const selfSchema = z
  .object({
    as: z.literal("myself"),
    partner_email: z.string().default(""),
  })
  .merge(baseSchema);

const partnerSchema = z
  .object({
    as: z.literal("partner"),
    partner_email: z
      .string()
      .min(1, { message: "Email partner wajib diisi" })
      .email("Email partner tidak valid"),
  })
  .merge(baseSchema);

export const questionnaireSchema = z.discriminatedUnion("as", [
  selfSchema,
  partnerSchema,
]);

export const assessmentSchema = z.object({
  diagnosis: z.string().min(1, { message: "Diagnosis wajib diisi" }),
  feedback: z.string().min(1, { message: "Feedback wajib diisi" }),
  status: z.string().default("done"),
});

export type QuestionnaireSchema = z.infer<typeof questionnaireSchema>;
export type AssessmentSchema = z.infer<typeof assessmentSchema>;

export interface IQuestionnaire {
  choices: null | IChoice[];
  description: string;
  goto: null | number;
  id: number;
  question: string;
  section: string;
  type: "choices" | "text";
  url_video: string;
}

export interface IAttempt {
  ai_accuracy: number;
  ai_diagnosis: string;
  ai_probability: number;
  code_attempt: string;
  diagnosis: string;
  feedback: string;
  id: string;
  notes_attempt: string;
  patient: {
    email: string;
    id: string;
    name: string;
  };
  patient_id: string;
  score: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface IAttemptAnswer {
  attempt_id: string;
  description: string;
  id: string;
  question: IQuestionnaire;
  question_id: number;
  score: number;
  created_at: string;
  updated_at: string;
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
