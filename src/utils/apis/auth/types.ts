import * as z from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email wajib diisi' })
    .email('Email tidak valid'),
  password: z.string().min(1, { message: 'Password wajib diisi' }),
});

export const adminLoginSchema = z
  .object({
    remember: z.boolean().default(false),
  })
  .merge(loginSchema);

export type LoginSchema = z.infer<typeof loginSchema>;
export type AdminLoginSchema = z.infer<typeof adminLoginSchema>;
