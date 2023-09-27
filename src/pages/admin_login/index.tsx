import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Swal from 'sweetalert2';

import { useAuth } from '../../store/apiAuth';
import { userLogin } from '../../utils/yup/login';
import { useSwalAuth } from '../../utils/swal/useSwalAuth';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, data, error } = useAuth();
  const errorMessage = error;

  const handleSubmit = async (values: {
    email: string;
    password: string;
    remember: boolean;
  }) => {
    try {
      const body = {
        email: values.email,
        password: values.password,
      };
      login(body.email, body.password);
      const token = data?.data?.token;
      console.log(token);
      if (token) {
        useSwalAuth('login', values.email.split('@')[0]);
        navigate('/admin/');
      } else if (errorMessage) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Login',
          text: `Pesan error : ${errorMessage}`,
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Login',
        text: `Periksa email/password Anda`,
        confirmButtonText: 'OK',
      });
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center font-medium text-xl">Login</div>
        <div className="text-3xl font-bold text-blue-600 mt-2 text-center">
          ADMIN
        </div>
      </div>
      <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-200 shadow-md">
        <Formik
          initialValues={{ email: '', password: '', remember: false }}
          validationSchema={userLogin}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid }) => (
            <Form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-gray-600 block"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={`w-full p-2 border rounded mt-1 ${
                    isValid ? 'border-gray-300' : 'border-red-500'
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-bold text-gray-600 block"
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className={`w-full p-2 border rounded mt-1 ${
                    isValid ? 'border-gray-300' : 'border-red-500'
                  }`}
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="remember"
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm font-bold text-gray-600"
                  >
                    Remember Me
                  </label>
                </div>
                <div>
                  <a href="" className="font-bold text-sm text-blue-600">
                    Forgot Password
                  </a>
                </div>
              </div>
              <div>
                <button
                  id="login"
                  type="submit"
                  className={`w-full p-2 bg-blue-600 text-white rounded mt-2 ${
                    isSubmitting || !isValid
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                  disabled={isSubmitting || !isValid}
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdminLogin;
