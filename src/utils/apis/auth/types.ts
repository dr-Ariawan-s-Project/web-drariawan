import * as z from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email wajib diisi' })
    .email('Email tidak valid'),
  password: z.string().min(1, { message: 'Password wajib diisi' }),
  remember: z.boolean().default(false),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export interface MyProfile {
  dob: string;
  email: string;
  gender: string;
  id: string;
  marriage_status: string;
  name: string;
  nationality: string;
  nik: string;
  phone: string;
}
