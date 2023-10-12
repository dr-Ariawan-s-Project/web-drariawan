import * as yup from 'yup';

const shape = {
  name: yup.string().required('Nama lengkap wajib diisi'),
  email: yup.string().required('Email wajib diisi'),
  password: yup.string().required('Password wajib diisi'),
  nik: yup.string().required('NIK wajib diisi'),
  dob: yup.string().required('Tanggal lahir wajib diisi'),
  phone: yup.string().required('Nomor telepon wajib diisi'),
  gender: yup.string().required('Jenis kelamin wajib diisi'),
  marriage_status: yup.string().required('Status pernikahan wajib diisi'),
  nationality: yup.string().required('Kewarganegaraan wajib diisi'),
  partner_option: yup.string().required('Partner wajib diisi'),
  partner_email: yup.string(),
};

export const registerPasien = yup.object().shape(shape);
