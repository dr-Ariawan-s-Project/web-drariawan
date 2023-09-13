import { FC } from 'react';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { LoginFormProps } from '../utils/component';

const LoginForm: FC<LoginFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(({ email, password, remember }) => {
    console.log('Data yang dikirim:', email, password, remember);
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center font-medium text-xl">Login</div>
        <div className="text-3xl font-bold text-health-blue-dark mt-2 text-center">
          ADMIN
        </div>
      </div>
      <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border-gray-200 shadow-md">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-bold text-gray-600 block"
            >
              Email
            </label>
            <input
              {...register('email', {
                required: true,
                minLength: 6,
                maxLength: 10,
                pattern: /^\S+@\S+$/i,
              })}
              type="email"
              name="email"
              id="email"
              className={`w-full p-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded mt-1`}
            />
            {errors.email && errors.email.message && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-bold text-gray-600 block"
            >
              Password
            </label>
            <input
              {...register('password', {
                required: 'Password harus diisi.',
                minLength: {
                  value: 6,
                  message: 'Password minimal 6 karakter.',
                },
                maxLength: {
                  value: 10,
                  message: 'Password maksimal 10 karakter.',
                },
              })}
              type="password"
              id="password"
              className={`w-full p-2 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded mt-1`}
            />
            {errors.password && errors.password.message && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                {...register('remember')}
                name="remember"
                type="checkbox"
                className="h-4 w-4 text-health-blue-reguler rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm font-lato_regular text-gray-600 "
              >
                Remember Me
              </label>
            </div>
            <div>
              <a
                href=""
                className="font-lato_regular text-sm text-health-blue-dark"
              >
                Forget Password
              </a>
            </div>
          </div>
          <div>
            <Button
              id="button"
              active={true}
              type="blue"
              label="Sign In"
              onClick={onSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
