import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CustomFormField } from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";

import {
  AssessmentSchema,
  assessmentSchema,
} from "@/utils/apis/questionnaire/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AssessmentSchema) => void;
}

const ModalAttempt = (props: Props) => {
  const { open, onOpenChange, onSubmit } = props;

  const form = useForm<AssessmentSchema>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      diagnosis: "",
      feedback: "",
    },
  });

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      onOpenChange(false);
      form.reset();
    }
  }, [form.formState]);

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
          <DialogTitle>Tambah asesmen</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            data-testid="form-dialog"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <CustomFormField
              control={form.control}
              name="diagnosis"
              label="Diagnosis"
            >
              {(field) => (
                <Input
                  {...field}
                  data-testid="input-diagnosis"
                  placeholder="Diagnosis"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  value={field.value as string}
                />
              )}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              name="feedback"
              label="Feedback"
            >
              {(field) => (
                <Input
                  {...field}
                  data-testid="input-feedback"
                  placeholder="Feedback"
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

export default ModalAttempt;
