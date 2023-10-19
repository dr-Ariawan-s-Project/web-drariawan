import * as yup from 'yup';

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const shape = {
  email: yup
    .string()
    .required('Email wajib diisi')
    .matches(emailPattern, 'Email tidak valid'),
  password: yup.string().required('Password wajib diisi'),
};

export const loginPasien = yup.object().shape(shape);
