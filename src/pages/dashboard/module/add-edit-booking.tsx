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
  CustomFormDatePicker,
  CustomFormSelect,
} from '@/components/custom-formfield';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { BookingSchema, IBook, bookingSchema } from '@/utils/apis/books/types';

interface Props {
  open: boolean;
  editData?: IBook;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: BookingSchema) => void;
}

const AddEditBooking = (props: Props) => {
  const { open, editData, onOpenChange, onSubmit } = props;

  const form = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      patient_id: '',
      schedule_id: '',
      booking_date: '',
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
      form.setValue('patient_id', editData.patient_id);
      form.setValue('schedule_id', editData.schedule_id);
      form.setValue('booking_date', editData.booking_date);
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
            {/* TODO: Change this to get list of patient */}
            <CustomFormSelect
              control={form.control}
              name="patient_id"
              label="Nama pasien"
              placeholder="Silahkan pilih pasien"
              options={[
                'Senin',
                'Selasa',
                'Rabu',
                'Kamis',
                'Jumat',
                'Sabtu',
                'Minggu',
              ]}
            />
            {/* TODO: Change this to get lsit of schedule */}
            <CustomFormSelect
              control={form.control}
              name="schedule_id"
              label="Jadwal"
              placeholder="Silahkan pilih jadwal"
              options={[
                'Senin',
                'Selasa',
                'Rabu',
                'Kamis',
                'Jumat',
                'Sabtu',
                'Minggu',
              ]}
            />
            <CustomFormDatePicker
              control={form.control}
              name="booking_date"
              label="Tanggal lahir"
              placeholder="mm/dd/yyyy"
            />
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

export default AddEditBooking;
