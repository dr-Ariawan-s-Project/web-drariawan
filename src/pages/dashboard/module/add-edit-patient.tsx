import { zodResolver } from '@hookform/resolvers/zod';
import { getCountryDataList } from 'countries-list';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  CustomFormDatePicker,
  CustomFormField,
  CustomFormSelect,
} from '@/components/custom-formfield';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';

import {
  IPatient,
  PatientSchema,
  patientSchema,
} from '@/utils/apis/patient/types';
import { forWho } from '@/utils/constants';

interface Props {
  open: boolean;
  editData?: IPatient;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PatientSchema) => void;
}

const AddEditPatient = (props: Props) => {
  const { open, editData, onOpenChange, onSubmit } = props;

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

  const countries = useMemo(() => {
    return getCountryDataList().map((country) => ({
      label: country.name,
      value: country.name,
    }));
  }, []);

  useEffect(() => {
    setEditData();
  }, [editData, form.formState.isSubmitSuccessful]);

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      onOpenChange(false);
      form.reset();
    }
  }, [form.formState]);

  function setEditData() {
    if (editData) {
      form.setValue('email', editData.email);
      form.setValue('phone', editData.phone);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        form.reset();
      }}
    >
      <DialogContent className="w-11/12 md:w-1/2 lg:w-2/3">
        <DialogHeader>
          <DialogTitle>{editData ? 'Update user' : 'Tambah user'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            data-testid="form-add-edit"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
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
            <CustomFormDatePicker
              control={form.control}
              name="dob"
              label="Tanggal lahir"
              placeholder="mm/dd/yyyy"
            />
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
              control={form.control}
              name="nationality"
              label="Kewarganegaraan"
              placeholder="Kewarganegaraan"
              options={countries}
            />
            <CustomFormSelect
              control={form.control}
              name="partner_option"
              label="Data ini untuk siapa?"
              placeholder="Pilih"
              options={forWho}
            />
            {form.watch('partner_option') === 'partner' && (
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
            )}
            <DialogFooter>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  'Simpan'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditPatient;
