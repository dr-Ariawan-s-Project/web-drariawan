import * as z from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, { message: 'Nama lengkap wajib diisi' }),
  email: z
    .string()
    .min(1, { message: 'Email wajib diisi' })
    .email('Email tidak valid'),
  phone: z.string().min(1, { message: 'Nomor telepon wajib diisi' }),
  role: z.string().min(1, { message: 'Nomor telepon wajib diisi' }),
  password: z.string().min(1, { message: 'Password wajib diisi' }),
  specialization: z.string().min(1, { message: 'Password wajib diisi' }),
});

export type UserSchema = z.infer<typeof userSchema>;

export interface IUser {
  email: string;
  id: number;
  name: string;
  phone: string;
  picture: string;
  role: string;
  specialization: string;
}
