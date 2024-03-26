import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CustomFormDatePicker,
  CustomFormSelect,
} from "@/components/custom-formfield";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { BookingSchema, IBook, bookingSchema } from "@/utils/apis/books/types";
import { getSchedules } from "@/utils/apis/schedule/api";
import { getPatients } from "@/utils/apis/patient/api";
import { ISelect } from "@/utils/types/data";

interface Props {
  open: boolean;
  editData?: IBook;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: BookingSchema) => void;
}

const ModalBooking = (props: Props) => {
  const { open, editData, onOpenChange, onSubmit } = props;
  const { toast } = useToast();

  const [patients, setPatients] = useState<ISelect[]>([]);
  const [schedules, setSchedules] = useState<ISelect[]>([]);

  const form = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      patient_id: "",
      schedule_id: "",
      booking_date: "",
    },
  });

  useEffect(() => {
    fetchPatients();
    fetchSchedules();
  }, []);

  const fetchPatients = async () => {
    try {
      const result = await getPatients();
      const newData = result.data.map((patient) => ({
        label: patient.name ?? "-",
        value: patient.id,
      }));

      setPatients(newData);
    } catch (error) {
      toast({
        title: "Oops! Sesuatu telah terjadi",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const fetchSchedules = async () => {
    try {
      const result = await getSchedules();
      const newData = result.data.map((schedule) => ({
        label: `${schedule.user.name} | ${schedule.day} | ${schedule.time_start} - ${schedule.time_end}`,
        value: String(schedule.schedule_id),
      }));

      setSchedules(newData);
    } catch (error) {
      toast({
        title: "Oops! Sesuatu telah terjadi",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

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
      form.setValue("patient_id", editData.patient_id);
      form.setValue("schedule_id", editData.schedule_id.toString());
      form.setValue("booking_date", editData.booking_date);
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
          <DialogTitle>
            {editData ? "Update booking" : "Tambah booking"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            data-testid="form-add-edit"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <CustomFormSelect
              data-testid="input-patient"
              control={form.control}
              name="patient_id"
              label="Nama pasien"
              placeholder="Silahkan pilih pasien"
              options={patients}
            />
            <CustomFormSelect
              data-testid="input-schedule"
              control={form.control}
              name="schedule_id"
              label="Jadwal"
              placeholder="Silahkan pilih jadwal"
              options={schedules}
            />
            <CustomFormDatePicker
              data-testid="input-dob"
              control={form.control}
              name="booking_date"
              label="Tanggal booking"
              placeholder="mm/dd/yyyy"
            />
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
                  "Simpan"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalBooking;
