import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  CustomFormField,
  CustomFormSelect,
} from '@/components/custom-formfield';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';

import { IUser, UserSchema, userSchema } from '@/utils/apis/user/types';
import { roles } from '@/utils/constants';

interface Props {
  open: boolean;
  editData?: IUser;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UserSchema) => void;
}

const ModalUser = (props: Props) => {
  const { open, editData, onOpenChange, onSubmit } = props;

  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      phone: '',
      role: '',
      specialization: '',
    },
  });

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
      form.setValue('name', editData.name);
      form.setValue('phone', editData.phone);
      form.setValue('role', editData.role);
      form.setValue('specialization', editData.specialization);
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
      <DialogContent
        data-testid="dialog-user"
        className="w-full md:w-1/2 lg:w-2/3"
      >
        <DialogHeader>
          <DialogTitle>{editData ? 'Update user' : 'Tambah user'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            data-testid="form-add-edit"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <CustomFormField control={form.control} name="name" label="Nama">
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
            <CustomFormField control={form.control} name="email" label="Email">
              {(field) => (
                <Input
                  {...field}
                  data-testid="input-email"
                  placeholder="nama@mail.com"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  type="email"
                  value={field.value as string}
                />
              )}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              name="phone"
              label="Nomor Telepon"
            >
              {(field) => (
                <Input
                  {...field}
                  data-testid="input-phone-number"
                  placeholder="Nomor Telepon"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  type="tel"
                  value={field.value as string}
                />
              )}
            </CustomFormField>
            <CustomFormSelect
              data-testid="input-role"
              control={form.control}
              name="role"
              label="Role"
              placeholder="Role"
              options={roles}
            />
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
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  type="password"
                  value={field.value as string}
                />
              )}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              name="specialization"
              label="Spesialisasi"
            >
              {(field) => (
                <Input
                  {...field}
                  data-testid="input-specialization"
                  placeholder="Spesialisasi"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  value={field.value as string}
                />
              )}
            </CustomFormField>
            <DialogFooter>
              <Button
                data-testid="btn-submit"
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

export default ModalUser;
