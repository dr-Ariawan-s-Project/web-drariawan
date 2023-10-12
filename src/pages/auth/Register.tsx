import { useState } from 'react';
import { useFormik } from 'formik';
import Button from '../../components/Button';
import { registerPasien } from '../../utils/yup/register_pasien';
import { motion, AnimatePresence } from 'framer-motion';

const Register = () => {
  const [currentFieldGroup, setCurrentFieldGroup] = useState<number>(0);
  const fieldGroups = [
    ['name', 'email', 'password'],
    ['nik', 'dob', 'phone'],
    ['gender', 'marriage_status', 'nationality'],
    ['partner_option', 'partner_email'],
  ];

  const isLastFieldGroup = currentFieldGroup === fieldGroups.length - 1;

  const validateCurrentFieldGroup = (values: any) => {
    const currentGroupFields = fieldGroups[currentFieldGroup];
    const fieldsToValidate = currentGroupFields.filter(
      (fieldName) => values[fieldName] === ''
    );

    return fieldsToValidate.length === 0;
  };

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

  const formik: any = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      nik: '',
      dob: '',
      phone: '',
      gender: '',
      marriage_status: '',
      nationality: '',
      partner_option: 'Myself',
      partner_email: '',
    },
    validationSchema: registerPasien,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const handleFieldGroupChange = () => {
    if (isLastFieldGroup) {
      formik.handleSubmit();
    } else {
      setCurrentFieldGroup((prevGroup) => prevGroup + 1);
    }
  };

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

        <div className="flex justify-end mt-20">
          <div className="font-semibold">
            <Button
              id="mulai"
              label={isLastFieldGroup ? 'Submit' : 'Next'}
              type="blue"
              active={validateCurrentFieldGroup(formik.values)}
              onClick={handleFieldGroupChange}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default Register;
