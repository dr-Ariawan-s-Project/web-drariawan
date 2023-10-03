import { useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { useEmailStore } from '../../store/getEmail';
import { useQuestionaire } from '../../store/apiQuestionaire';
import { createDataDiri } from '../../utils/yup/data_diri';
import { useSwalCreate } from '../../utils/swal/useSwalData';

import Button from '../../components/Button';

const DataDiri = () => {
  const navigate: NavigateFunction = useNavigate();
  const { setEmail: setEmailInStore } = useEmailStore();
  const { validateQuestionaire, data } = useQuestionaire() as any;

  const formik = useFormik({
    initialValues: {
      email: '',
      phoneNumber: '',
      patientStatus: '',
      patientEmail: '',
    },
    validationSchema: createDataDiri,
    onSubmit: async (values) => {
      setEmailInStore(values.email);
      localStorage.setItem('userEmail', values.email);
      try {
        const body = {
          email: values.email,
          phone: values.phoneNumber,
          as: values.patientStatus,
          partner_email: values.patientEmail,
        };
        await validateQuestionaire(body);
      } catch (error) {
        useSwalCreate(
          'failed',
          'Pengguna ini sudah mengambil test, silahkan pakai akun lain'
        );
      }
    },
  });

  useEffect(() => {
    const code_attempt = data?.data?.code_attempt;
    console.log('code att : ', code_attempt);
    if (code_attempt) {
      navigate('/verifikasi_email', {
        state: {
          code_attempt: code_attempt,
        },
      });
    }
  }, [data]);

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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="user-type"
          >
            Pilih Status<span className="text-red-500 ml-1">*</span>
          </label>
          <select
            className={`bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 ${
              formik.touched.patientStatus && formik.errors.patientStatus
                ? 'border-red-500'
                : ''
            }`}
            id="pilih-status"
            {...formik.getFieldProps('patientStatus')}
          >
            <option value="">Pilih Status</option>
            <option value="myself">Myself</option>
            <option value="patient">Partner</option>
          </select>
          {formik.touched.patientStatus && formik.errors.patientStatus && (
            <p className="text-red-500">{formik.errors.patientStatus}</p>
          )}
        </div>
        {formik.values.patientStatus === 'patient' && (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="patient-email"
            >
              Partner Email<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              className={`bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 ${
                formik.touched.patientEmail && formik.errors.patientEmail
                  ? 'border-red-500'
                  : ''
              }`}
              id="patient-email"
              type="email"
              placeholder="Partner Email"
              {...formik.getFieldProps('patientEmail')}
            />
            {formik.touched.patientEmail && formik.errors.patientEmail && (
              <p className="text-red-500">{formik.errors.patientEmail}</p>
            )}
          </div>
        )}

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
