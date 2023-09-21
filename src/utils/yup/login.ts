import * as yup from 'yup'

const shape = {
  email: yup.string().required('Email wajib diisi').email('Alamat email tidak valid'),
  password: yup.string().required('Password wajib diisi'),
  remember: yup.boolean(),
};

export const userLogin = yup.object().shape(shape);