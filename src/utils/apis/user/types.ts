import * as z from 'zod';

const MAX_MB = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const userSchema = z.object({
  name: z.string().min(1, { message: 'Nama lengkap wajib diisi' }),
  email: z
    .string()
    .min(1, { message: 'Email wajib diisi' })
    .email('Email tidak valid'),
  phone: z.string().min(1, { message: 'Nomor telepon wajib diisi' }),
  role: z.string().min(1, { message: 'Role wajib diisi' }),
  password: z.string().min(1, { message: 'Password wajib diisi' }),
  specialization: z.string().min(1, { message: 'Spesialisasi wajib diisi' }),
});

export const updateSchema = z
  .object({
    picture: z
      .instanceof(File)
      .optional()
      .refine(
        (file) => !file || file.size <= MAX_UPLOAD_SIZE,
        `Maksimal ukuran gambar adalah ${MAX_MB}MB`
      )
      .refine(
        (file) =>
          !file || file.type === '' || ACCEPTED_IMAGE_TYPES.includes(file.type),
        'Hanya mendukung format .jpg, .jpeg, and .png saja'
      ),
  })
  .merge(userSchema);

export type UserSchema = z.infer<typeof userSchema>;
export type UpdateSchema = z.infer<typeof updateSchema>;

export interface IUser {
  email: string;
  id: number;
  name: string;
  phone: string;
  picture: string;
  role: string;
  specialization: string;
}
