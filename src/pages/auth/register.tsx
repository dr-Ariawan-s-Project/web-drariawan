import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';

import {
  CustomFormField,
  CustomFormSelect,
  CustomFormDatePicker,
} from '@/components/custom-formfield';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import Layout from '@/components/layout';
import { useToast } from '@/components/ui/use-toast';
import { RegisterSchema, registerSchema } from '@/utils/apis/auth/types';
import { userRegister } from '@/utils/apis/auth/api';

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      nik: '',
      birthDate: '',
      phone_number: '',
      gender: 'Male',
      marriage_status: 'Not_Married',
      nationality: '',
      partner_option: 'Myself',
    },
  });

  async function onSubmit(data: RegisterSchema) {
    try {
      const result = await userRegister(data);
      toast({
        description: 'Hello, welcome back!',
      });
      // TODO: Change response when it is known
      // addAuth(result.data);
      // Cookies.set('token', userData.token, { expires: 1 });
      navigate('/scheduling');
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
      <p className="font-lato_black text-center mb-4 text-4xl">Register</p>
      <p className="text-lg lg:text-xl">Silakan mengisi data terlebih dahulu</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-10 w-full md:max-w-md lg:max-w-lg"
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
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="name"
            label="Nama lengkap"
          >
            {(field) => (
              <Input
                {...field}
                data-testid="input-name"
                placeholder="Nama"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>
          <div className="flex space-x-8 w-full">
            <CustomFormSelect
              control={form.control}
              name="gender"
              label="Jenis kelamin"
              placeholder="Pilih jenis kelamin"
              options={['Male', 'Female']}
            />
            <CustomFormSelect
              control={form.control}
              name="marriage_status"
              label="Status"
              placeholder="Pilih status"
              options={['Married', 'Not_Married', 'Divorce']}
            />
          </div>
          <CustomFormField control={form.control} name="nik" label="NIK">
            {(field) => (
              <Input
                {...field}
                data-testid="input-nik"
                placeholder="NIK"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>
          <CustomFormDatePicker
            control={form.control}
            name="birthDate"
            label="Tanggal lahir"
            placeholder="mm/dd/yyyy"
          />
          <CustomFormField
            control={form.control}
            name="phone_number"
            label="Nomor telepon"
          >
            {(field) => (
              <Input
                {...field}
                data-testid="input-phone-number"
                placeholder="Nomor telepon"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="nationality"
            label="Kewarganegaraan"
          >
            {(field) => (
              <Input
                {...field}
                data-testid="input-nationality"
                placeholder="Kewarganegaraan"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>
          <CustomFormSelect
            control={form.control}
            name="partner_option"
            label="Data ini untuk siapa?"
            placeholder="Pilih"
            options={['Myself', 'Partner']}
          />
          {form.watch('partner_option') === 'Partner' && (
            <CustomFormField
              control={form.control}
              name="partner_email"
              label="Email Partner"
            >
              {(field) => (
                <Input
                  {...field}
                  data-testid="input-partner-email"
                  placeholder="name@mail.com"
                  type="email"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                />
              )}
            </CustomFormField>
          )}
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
                Sudah memiliki akun? silakan klik disini!
              </Link>
            </Button>
          </div>
        </form>
      </Form>
    </Layout>
  );
};

export default Register;
