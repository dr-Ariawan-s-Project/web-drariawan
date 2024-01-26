import { GENDER, MARRIAGE_STATUS } from '@/utils/constants';
import { format } from 'date-fns';
import * as z from 'zod';

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
  phone: z.string().min(1, { message: 'Nomor telepon wajib diisi' }),
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
    partner_option: z.literal('myself'),
    partner_email: z.string().default(''),
  })
  .merge(baseSchema);

const partnerSchema = z
  .object({
    partner_option: z.literal('partner'),
    partner_email: z
      .string()
      .min(1, { message: 'Email partner wajib diisi' })
      .email('Email partner tidak valid'),
  })
  .merge(baseSchema);

export const patientSchema = z.discriminatedUnion('partner_option', [
  selfSchema,
  partnerSchema,
]);

export const profileSchema = z.object({
  name: z.string().min(1, { message: 'Nama lengkap wajib diisi' }),
  email: z
    .string()
    .min(1, { message: 'Email wajib diisi' })
    .email('Email tidak valid'),
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
  phone: z.string().min(1, { message: 'Nomor telepon wajib diisi' }),
  gender: z.enum(GENDER, {
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
  marriage_status: z.enum(MARRIAGE_STATUS, {
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

export type PatientSchema = z.infer<typeof patientSchema>;
export type ProfileSchema = z.infer<typeof profileSchema>;

export interface IPatient {
  email: string;
  id: string;
  phone: string;
  name?: string;
  nik?: string;
  dob?: string;
  gender?: string;
  marriage_status?: string;
  nationality?: string;
}

export interface MyProfile {
  dob: string;
  email: string;
  gender: GENDER;
  id: string;
  marriage_status: MARRIAGE_STATUS;
  name: string;
  nationality: string;
  nik: string;
  phone: string;
}
