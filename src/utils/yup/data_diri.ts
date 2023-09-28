import * as yup from 'yup';

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const shape = {
  email: yup
    .string()
    .required('Email wajib diisi')
    .matches(emailPattern, 'Email tidak valid'),
  phoneNumber: yup.string().required('No Handphone wajib diisi'),
  patientStatus: yup.string().required('Status wajib diisi'),
  patientEmail: yup.string(),
};

export const createDataDiri = yup.object().shape(shape);
