import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Button from '../../components/Button';
import { registerPasien } from '../../utils/yup/register_pasien';
import { usePatient } from '../../store/apiPatient';
import { useSwalCreate } from '../../utils/swal/useSwalData';

const Register = () => {
  const navigate = useNavigate();
  const { postPatient } = usePatient();
  const [currentFieldGroup, setCurrentFieldGroup] = useState<number>(0);
  const fieldGroups = [
    ['name', 'email', 'password'],
    ['nik', 'dob', 'phone'],
    ['gender', 'marriage_status', 'nationality'],
    ['partner_option', 'partner_email'],
  ];
  const label: any = {
    name: 'Nama lengkap',
    email: 'Email',
    password: 'Password',
    nik: 'NIK',
    dob: 'Tanggal lahir',
    phone: 'Nomor telepon',
    gender: 'Jenis kelamin',
    marriage_status: 'Status perkawinan',
    nationality: 'Kewarganegaraan',
    partner_option: 'Data ini untuk siapa?',
    partner_email: 'Email partner',
  };

  const validateCurrentFieldGroup = (values: any) => {
    const currentGroupFields = fieldGroups[currentFieldGroup];
    const fieldsToValidate = currentGroupFields.filter(
      (fieldName) => values[fieldName] === ''
    );

    return fieldsToValidate.length === 0;
  };

  const formik: any = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      nik: '',
      dob: '',
      phone: '',
      gender: 'Male',
      marriage_status: 'Married',
      nationality: '',
      partner_option: 'Myself',
      partner_email: '',
    },
    validationSchema: registerPasien,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const handleFieldGroupChange = async () => {
    if (isLastFieldGroup) {
      if (formik.values.partner_option !== '') {
        formik.handleSubmit();
        try {
          const body = {
            name: formik.values.name,
            email: formik.values.email,
            password: formik.values.password,
            nik: formik.values.nik,
            dob: formik.values.dob,
            phone: formik.values.phone,
            gender: formik.values.gender,
            marriage_status: formik.values.marriage_status,
            nationality: formik.values.nationality,
            partner_option: formik.values.partner_option,
            partner_email: formik.values.partner_email,
          };
          postPatient(
            body.name,
            body.email,
            body.password,
            body.nik,
            body.dob,
            body.phone,
            body.gender,
            body.marriage_status,
            body.nationality,
            body.partner_option,
            body.partner_email
          ).then(() => {
            useSwalCreate(
              'Berhasil registrasi, silahkan login terlebih dahulu',
              'Sukses'
            );
            navigate('/auth/option/login');
          });
        } catch (error) {
          useSwalCreate('Gagal registrasi, silahkan coba kembali', 'Gagal');
        }
      }
    } else {
      setCurrentFieldGroup((prevGroup) => prevGroup + 1);
    }
  };

  const isLastFieldGroup = currentFieldGroup === fieldGroups.length - 1;
  const isPartnerEmailRequired = formik.values.partner_option === 'Partner';

  return (
    <section className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 mt-18">
      <h2 className="text-center font-lato_black text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">
        Register
      </h2>
      <div className="text-center mb-8">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl">
          Silakan mengisi data terlebih dahulu
        </p>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-sm mt-10 lg:mt-20"
      >
        <AnimatePresence initial={false} custom={currentFieldGroup}>
          {fieldGroups[currentFieldGroup].map((fieldName) => (
            <motion.div
              key={fieldName}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              {fieldName === 'partner_email' &&
              formik.values.partner_option === 'Myself' ? null : (
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor={fieldName}
                  >
                    {label[fieldName]}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  {fieldName === 'dob' ? (
                    <input
                      type="date"
                      name="dob"
                      value={formik.values.dob}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus.bg-white focus.border-blue-500 ${
                        formik.touched.dob && formik.errors.dob
                          ? 'border-red-500'
                          : ''
                      }`}
                    />
                  ) : fieldName === 'partner_option' ? (
                    <select
                      name="partner_option"
                      value={formik.values.partner_option}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Silahkan pilih untuk siapa"
                      className={`bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus.bg-white focus.border-blue-500 ${
                        formik.touched.partner_option &&
                        formik.errors.partner_option
                          ? 'border-red-500'
                          : ''
                      }`}
                    >
                      <option value="Myself">Myself</option>
                      <option value="Partner">Partner</option>
                    </select>
                  ) : fieldName === 'gender' ? (
                    <select
                      name="gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Silahkan pilih jenis kelamin"
                      className={`bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus.bg-white focus.border-blue-500 ${
                        formik.touched.gender && formik.errors.gender
                          ? 'border-red-500'
                          : ''
                      }`}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  ) : fieldName === 'marriage_status' ? (
                    <select
                      name="marriage_status"
                      value={formik.values.marriage_status}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Silahkan pilih jenis kelamin"
                      className={`bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus.bg-white focus.border-blue-500 ${
                        formik.touched.marriage_status &&
                        formik.errors.marriage_status
                          ? 'border-red-500'
                          : ''
                      }`}
                    >
                      <option value="Married">Married</option>
                      <option value="Not_Married">Not Married</option>
                      <option value="Divorce">Divorce</option>
                    </select>
                  ) : (
                    <input
                      name={fieldName}
                      type={fieldName === 'password' ? 'password' : 'text'}
                      placeholder={fieldName === 'email' ? 'Email' : fieldName}
                      {...formik.getFieldProps(fieldName)}
                      className={`bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus.bg-white focus.border-blue-500 ${
                        formik.touched[fieldName] && formik.errors[fieldName]
                          ? 'border-red-500'
                          : ''
                      }`}
                    />
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="flex flex-col-reverse mt-20 gap-y-5">
          <Link
            className="cursor-pointer underline mx-auto"
            to={'/auth/option/login'}
          >
            Pernah buat akun? silakan klik disini!
          </Link>
          <div className="font-semibold">
            <Button
              id="mulai"
              label={isLastFieldGroup ? 'Submit' : 'Next'}
              type="blue"
              active={
                validateCurrentFieldGroup(formik.values) ||
                (isLastFieldGroup && !isPartnerEmailRequired)
              }
              onClick={handleFieldGroupChange}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default Register;
