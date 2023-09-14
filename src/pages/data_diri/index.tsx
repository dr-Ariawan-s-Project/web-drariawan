import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/Button';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useEmailStore } from '../../store/getEmail';

const DataDiri = () => {
  const navigate: NavigateFunction = useNavigate();
  const { setEmail: setEmailInStore } = useEmailStore();

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phonePattern = /^\d{10,}$/;

  const formik = useFormik({
    initialValues: {
      email: '',
      phoneNumber: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email wajib diisi')
        .matches(emailPattern, 'Email tidak valid'),
      phoneNumber: Yup.string()
        .required('No Handphone wajib diisi')
        .matches(
          phonePattern,
          'Masukkan nomor handphone yang valid (minimal 10 angka)'
        ),
    }),
    onSubmit: (values) => {
      setEmailInStore(values.email);
      localStorage.setItem('userEmail', values.email);
      navigate('/verifikasi_email');
    },
  });

  return (
    <section className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 mt-18">
      <h2 className="text-center font-lato_black text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">
        Input Data
      </h2>
      <div className="text-center mb-8">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl">
          Silakan mengisi formulir ini dengan informasi yang diperlukan.
        </p>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-sm mt-10 lg:mt-20"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="user-email"
          >
            Email<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            className={`bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 ${
              formik.touched.email && formik.errors.email
                ? 'border-red-500'
                : ''
            }`}
            id="user-email"
            type="email"
            placeholder="Email"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500">{formik.errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="no-handphone"
          >
            No Handphone<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            className={`bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 ${
              formik.touched.phoneNumber && formik.errors.phoneNumber
                ? 'border-red-500'
                : ''
            }`}
            id="no-handphone"
            type="tel"
            placeholder="No Handphone"
            {...formik.getFieldProps('phoneNumber')}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <p className="text-red-500">{formik.errors.phoneNumber}</p>
          )}
        </div>
        <div className="flex justify-end mt-20">
          <div className="font-semibold">
            <Button
              id="mulai"
              label="Selanjutnya"
              type="blue"
              active={formik.isValid}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default DataDiri;
