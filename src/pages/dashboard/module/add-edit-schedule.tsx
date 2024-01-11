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

import {
  ISchedule,
  ScheduleSchema,
  scheduleSchema,
} from '@/utils/apis/schedule/types';
import { daysInWeek } from '@/utils/constants';

interface Props {
  open: boolean;
  editData?: ISchedule;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ScheduleSchema) => void;
}

const AddEditSchedule = (props: Props) => {
  const { open, editData, onOpenChange, onSubmit } = props;

  const form = useForm<ScheduleSchema>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      user_id: '',
      day: '',
      health_care_address: '',
      time_end: '',
      time_start: '',
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
      form.setValue('health_care_address', editData.health_care_address);
      form.setValue('day', editData.day);
      form.setValue('time_start', editData.time_start);
      form.setValue('time_end', editData.time_end);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full md:w-1/2 lg:w-2/3">
        <DialogHeader>
          <DialogTitle>{editData ? 'Update user' : 'Tambah user'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* TODO: Change this select data to doctor list */}
            <CustomFormSelect
              control={form.control}
              name="user_id"
              label="Dokter"
              placeholder="Dokter"
              options={daysInWeek}
            />
            <CustomFormSelect
              control={form.control}
              name="day"
              label="Hari"
              placeholder="Silahkan pilih hari"
              options={daysInWeek}
            />
            <CustomFormField
              control={form.control}
              name="health_care_address"
              label="Alamat Praktek"
            >
              {(field) => (
                <Input
                  {...field}
                  placeholder="Alamat Praktek"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  value={field.value as string}
                />
              )}
            </CustomFormField>
            <div className="flex space-x-8 w-full">
              <CustomFormField
                control={form.control}
                name="time_start"
                label="Jam Mulai"
              >
                {(field) => (
                  <Input
                    {...field}
                    placeholder="Jam Mulai"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    type="time"
                    value={field.value as string}
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="time_end"
                label="Jam Selesai"
              >
                {(field) => (
                  <Input
                    {...field}
                    placeholder="Jam Selesai"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    type="time"
                    value={field.value as string}
                  />
                )}
              </CustomFormField>
            </div>
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

export default AddEditSchedule;
