import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { getCountryDataList } from 'countries-list';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { useMemo } from 'react';

import {
  CustomFormField,
  CustomFormSelect,
} from '@/components/custom-formfield';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layout } from '@/components/layout';
import { Form } from '@/components/ui/form';

import { PatientSchema, patientSchema } from '@/utils/apis/patient/types';
import { postPatient } from '@/utils/apis/patient/api';
import { forWho } from '@/utils/constants';

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const countries = useMemo(() => {
    return getCountryDataList().map((country) => ({
      label: country.name,
      value: country.name,
    }));
  }, []);

  const form = useForm<PatientSchema>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      nik: '',
      dob: '',
      phone: '',
      gender: 'Male',
      marriage_status: 'Not_Married',
      nationality: 'Indonesia',
      partner_email: '',
      partner_option: 'myself',
    },
  });

  async function onSubmit(data: PatientSchema) {
    try {
      await postPatient(data);
      toast({
        description: 'Berhasil registrasi, silahkan login terlebih dahulu',
      });
      navigate('/login');
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
      <p className="font-bold text-center mb-4 text-4xl">Register</p>
      <p className="text-lg lg:text-xl text-center">
        Silakan mengisi data terlebih dahulu
      </p>
      <Form {...form}>
        <form
          data-testid="form-register"
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
                value={field.value as string}
              />
            )}
          </CustomFormField>
          <div className="flex space-x-8 w-full">
            <CustomFormSelect
              data-testid="input-gender"
              control={form.control}
              name="gender"
              label="Jenis kelamin"
              placeholder="Pilih jenis kelamin"
              options={[
                {
                  label: 'Male',
                  value: 'Male',
                },
                {
                  label: 'Female',
                  value: 'Female',
                },
              ]}
            />
            <CustomFormSelect
              data-testid="input-status"
              control={form.control}
              name="marriage_status"
              label="Status"
              placeholder="Pilih status"
              options={[
                {
                  label: 'Menikah',
                  value: 'Married',
                },
                {
                  label: 'Belum menikah',
                  value: 'Not_Married',
                },
                {
                  label: 'Cerai',
                  value: 'Divorce',
                },
              ]}
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
                value={field.value as string}
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="dob"
            label="Tanggal lahir"
          >
            {(field) => (
              <Input
                {...field}
                data-testid="input-dob"
                placeholder="Tanggal lahir"
                // TODO: Change this component to using CustomFormDatePicker with proper data-testid
                type="date"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                value={field.value as string}
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="phone"
            label="Nomor telepon"
          >
            {(field) => (
              <Input
                {...field}
                data-testid="input-phone-number"
                placeholder="+62818111111"
                type="tel"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                value={field.value as string}
              />
            )}
          </CustomFormField>
          <CustomFormSelect
            data-testid="input-nationality"
            control={form.control}
            name="nationality"
            label="Kewarganegaraan"
            placeholder="Kewarganegaraan"
            options={countries}
          />
          <CustomFormSelect
            data-testid="input-option"
            control={form.control}
            name="partner_option"
            label="Data ini untuk siapa?"
            placeholder="Pilih"
            options={forWho}
          />
          {form.watch('partner_option') === 'partner' ? (
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
                  value={field.value as string}
                />
              )}
            </CustomFormField>
          ) : null}
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
                'Register'
              )}
            </Button>
            <Button variant="link" asChild>
              <Link to="/login">Sudah memiliki akun? silakan klik disini!</Link>
            </Button>
          </div>
        </form>
      </Form>
    </Layout>
  );
};

export default Register;
