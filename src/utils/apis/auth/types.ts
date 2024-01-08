import { format } from 'date-fns';
import * as z from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email wajib diisi' })
    .email('Email tidak valid'),
  password: z.string().min(1, { message: 'Password wajib diisi' }),
  remember: z.boolean().default(false),
});

const baseSchema = z.object({
  name: z.string().min(1, { message: 'Nama lengkap wajib diisi' }),
  email: z
    .string()
    .min(1, { message: 'Email wajib diisi' })
    .email('Email tidak valid'),
  password: z.string().min(1, { message: 'Password wajib diisi' }),
  nik: z
    .string()
    .min(16, { message: 'NIK wajib diisi' })
    .max(16, { message: 'Format NIK tidak sesuai' }),
  dob: z
    .date({
      required_error: 'Tanggal lahir wajib diisi',
      invalid_type_error: 'Tanggal lahir wajib diisi',
    })
    .transform((value) => format(value, 'yyyy-MM-dd')),
  phone_number: z.string().min(1, { message: 'Nomor telepon wajib diisi' }),
  gender: z.enum(['Male', 'Female'], {
    errorMap: (issue) => {
      switch (issue.code) {
        case 'invalid_type':
          return { message: 'Jenis kelamin wajib diisi' };
        case 'invalid_enum_value':
          return { message: 'Jenis kelamin wajib diisi' };
        default:
          return { message: 'Jenis kelamin wajib diisi' };
      }
    },
  }),
  marriage_status: z.enum(['Married', 'Not_Married', 'Divorce'], {
    errorMap: (issue) => {
      switch (issue.code) {
        case 'invalid_type':
          return { message: 'Status pernikahan wajib diisi' };
        case 'invalid_enum_value':
          return { message: 'Status pernikahan wajib diisi' };
        default:
          return { message: 'Status pernikahan wajib diisi' };
      }
    },
  }),
  nationality: z.string().min(1, { message: 'Kewarganegaraan wajib diisi' }),
});

const selfSchema = z
  .object({
    partner_option: z.literal('Myself'),
    partner_email: z.string().default(''),
  })
  .merge(baseSchema);

const partnerSchema = z
  .object({
    partner_option: z.literal('Partner'),
    partner_email: z
      .string()
      .min(1, { message: 'Email partner wajib diisi' })
      .email('Email partner tidak valid'),
  })
  .merge(baseSchema);

export const registerSchema = z.discriminatedUnion('partner_option', [
  selfSchema,
  partnerSchema,
]);

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
