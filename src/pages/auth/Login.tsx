import { useFormik } from 'formik';
import { NavigateFunction, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

import { loginPasien } from '../../utils/yup/login_pasien';
import { useSwalAuth } from '../../utils/swal/useSwalAuth';
import { usePatient } from '../../store/apiPatient';

import Button from '../../components/Button';

const Login = () => {
  const navigate: NavigateFunction = useNavigate();
  const { loginPatient } = usePatient();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginPasien,
    onSubmit: async (values) => {
      try {
        const body = {
          email: values.email,
          password: values.password,
        };
        const response: any = await loginPatient(body.email, body.password);
        const userData = {
          token: response?.data?.token,
          name: response?.data?.name,
        };
        if (userData.token) {
          Cookies.set('token', userData.token, { expires: 1 });
          useSwalAuth('login', userData.name);
          navigate('/scheduling');
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Login',
          text: `Periksa email/password Anda`,
          confirmButtonText: 'OK',
        });
      }
    },
  });

  return (
    <section className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 mt-18">
      <h2 className="text-center font-lato_black text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">
        Login
      </h2>
      <div className="text-center mb-8">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl">
          Silakan login untuk memilih jadwal praktik
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
            htmlFor="user-password"
          >
            Password<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            className={`bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 ${
              formik.touched.password && formik.errors.password
                ? 'border-red-500'
                : ''
            }`}
            id="user-password"
            type="password"
            placeholder="Password"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500">{formik.errors.password}</p>
          )}
        </div>
        <div className="flex flex-col-reverse gap-y-5 mt-20">
          <Link
            className="cursor-pointer underline mx-auto"
            to={'/auth/option/register'}
          >
            Belum buat akun? silakan klik disini!
          </Link>
          <div className="font-semibold">
            <Button
              id="submit"
              label="Submit"
              type="blue"
              active={formik.isValid}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
