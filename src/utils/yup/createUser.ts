import * as yup from 'yup'

const shape = {
    name: yup.string().required('Nama belum diisi'),
    email: yup.string().required('Email belum diisi') ,
    specialization: yup.string().required('Specialization belum diisi') ,
    role: yup.string().required('Role belum diisi')
}

export const createUserSchema = yup.object().shape(shape)