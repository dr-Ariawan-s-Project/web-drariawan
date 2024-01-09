import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { CustomFormField } from '@/components/custom-formfield';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import { Layout } from '@/components/layout';

import { LoginSchema, loginSchema } from '@/utils/apis/auth/types';
import { setAxiosConfig } from '@/utils/apis/axiosWithConfig';
import { userLogin } from '@/utils/apis/auth/api';
import useAuthStore from '@/utils/states/auth';

const Login = () => {
  const addAuth = useAuthStore((state) => state.addAuth);
  const { toast } = useToast();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: true,
    },
  });

  async function onSubmit(data: LoginSchema) {
    try {
      const result = await userLogin(data);
      toast({
        description: `Halo ${result.data.name}, selamat datang kembali`,
      });
      addAuth(result.data, data.remember);
      setAxiosConfig(result.data.token);
    } catch (error) {
      toast({
        title: 'Oops! Sesuatu telah terjadi',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  }

  return (
    <Layout centerX centerY>
      <p className="font-bold text-center mb-4 text-4xl">Login</p>
      <p className="text-lg lg:text-xl text-center">
        Silakan login untuk memilih jadwal praktek
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-sm space-y-8 mt-10 w-full md:max-w-md lg:max-w-lg"
        >
          <CustomFormField control={form.control} name="email" label="Email">
            {(field) => (
              <Input
                {...field}
                data-testid="input-email"
                placeholder="name@mail.com"
                type="email"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                value={field.value as string}
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="password"
            label="Password"
          >
            {(field) => (
              <Input
                {...field}
                data-testid="input-password"
                placeholder="Password"
                type="password"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                value={field.value as string}
              />
            )}
          </CustomFormField>
          <div className="flex flex-col mt-20 gap-y-5">
            <Button
              data-testid="btn-submit"
              type="submit"
              disabled={form.formState.isSubmitting}
              aria-disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="h-4 mr-2 animate-spin w-4" />
                  Please wait
                </>
              ) : (
                'Login'
              )}
            </Button>
            <Button variant="link" asChild>
              <Link to="/register">
                Belum memiliki akun? Silakan klik disini!
              </Link>
            </Button>
          </div>
        </form>
      </Form>
    </Layout>
  );
};

export default Login;
