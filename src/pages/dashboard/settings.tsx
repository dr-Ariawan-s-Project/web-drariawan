import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

import {
  CustomFormField,
  CustomFormSelect,
} from "@/components/custom-formfield";
import { useToast } from "@/components/ui/use-toast";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";

import { UpdateSchema, updateSchema } from "@/utils/apis/user/types";
import { getProfile, updateUser } from "@/utils/apis/user/api";
import { roles } from "@/utils/constants";

const Setting = () => {
  const { toast } = useToast();

  const form = useForm<UpdateSchema>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "",
      picture: new File([], ""),
      specialization: "",
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await getProfile();

      form.setValue("name", data.name);
      form.setValue("email", data.email);
      form.setValue("phone", data.phone);
      form.setValue("role", data.role);
      form.setValue("specialization", data.specialization);
    } catch (error) {
      toast({
        title: "Oops! Sesuatu telah terjadi",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  async function onSubmit(data: UpdateSchema) {
    try {
      const result = await updateUser(data);

      toast({
        description: result.messages[0],
      });
    } catch (error) {
      toast({
        title: "Oops! Sesuatu telah terjadi",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }

  return (
    <Layout variant="admin">
      <Form {...form}>
        <form
          data-testid="form-setting"
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
                placeholder="Email"
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
          <CustomFormSelect
            data-testid="input-role"
            control={form.control}
            name="role"
            label="Role"
            placeholder="Role"
            options={roles}
            disabled
          />
          <CustomFormField
            control={form.control}
            name="picture"
            label="Foto profile"
          >
            {(field) => (
              <Input
                data-testid="input-picture"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                multiple={false}
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                onChange={(e) =>
                  field.onChange(e.target.files ? e.target.files[0] : null)
                }
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
                "Simpan"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Layout>
  );
};

export default Setting;
