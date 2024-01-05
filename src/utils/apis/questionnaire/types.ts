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
