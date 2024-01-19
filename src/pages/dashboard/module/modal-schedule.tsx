import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
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
  CustomFormField,
  CustomFormSelect,
} from '@/components/custom-formfield';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';

import {
  ISchedule,
  ScheduleSchema,
  scheduleSchema,
} from '@/utils/apis/schedule/types';
import { getUsers } from '@/utils/apis/user/api';
import { daysInWeek } from '@/utils/constants';
import { ISelect } from '@/utils/types/data';

interface Props {
  open: boolean;
  editData?: ISchedule;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ScheduleSchema) => void;
}

const ModalSchedule = (props: Props) => {
  const { open, editData, onOpenChange, onSubmit } = props;
  const { toast } = useToast();

  const [doctors, setDoctors] = useState<ISelect[]>([]);

  const form = useForm<ScheduleSchema>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      user_id: 0,
      day: '',
      health_care_address: '',
      time_end: '',
      time_start: '',
    },
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    setEditData();
  }, [editData, form.formState.isSubmitSuccessful]);

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      onOpenChange(false);
      form.reset();
    }
  }, [editData, form.formState]);

  const fetchDoctors = async () => {
    try {
      const result = await getUsers({ role: 'dokter' });
      const newData = result.data.map((doctor) => ({
        label: doctor.name,
        value: doctor.id,
      }));

      setDoctors(newData);
    } catch (error) {
      toast({
        title: 'Oops! Sesuatu telah terjadi',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  function setEditData() {
    if (editData) {
      form.setValue('user_id', editData.user_id);
      form.setValue('health_care_address', editData.health_care_address);
      form.setValue('day', editData.day);
      form.setValue('time_start', editData.time_start);
      form.setValue('time_end', editData.time_end);
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
      <DialogContent className="w-full md:w-1/2 lg:w-2/3">
        <DialogHeader>
          <DialogTitle>{editData ? 'Update user' : 'Tambah user'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            data-testid="form-add-edit"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <CustomFormSelect
              data-testid="input-doctor"
              control={form.control}
              name="user_id"
              label="Dokter"
              placeholder="Nama dokter"
              options={doctors}
            />
            <CustomFormSelect
              data-testid="input-day"
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
                  data-testid="input-address"
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
                    data-testid="input-start"
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
                    data-testid="input-end"
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

export default ModalSchedule;
