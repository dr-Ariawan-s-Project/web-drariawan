import { zodResolver } from "@hookform/resolvers/zod";
import { getCountryDataList } from "countries-list";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { capitalize } from "lodash";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CustomFormDatePicker,
  CustomFormField,
  CustomFormSelect,
} from "@/components/custom-formfield";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/layout";
import { Form } from "@/components/ui/form";

import { ProfileSchema, profileSchema } from "@/utils/apis/patient/types";
import { getMyProfile } from "@/utils/apis/patient/api";

const Profile = () => {
  const { toast } = useToast();

  const countries = useMemo(() => {
    return getCountryDataList().map((country) => ({
      label: country.name,
      value: country.name,
    }));
  }, []);

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      dob: "",
      phone: "",
      gender: "male",
      marriage_status: "not_married",
      nationality: "Indonesia",
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await getMyProfile();

      form.setValue("email", data.email);
      form.setValue("name", data.name);
      form.setValue("gender", data.gender);
      form.setValue("marriage_status", data.marriage_status);
      form.setValue("dob", data.dob);
      form.setValue("phone", data.phone);
      form.setValue("nationality", capitalize(data.nationality));
    } catch (error) {
      toast({
        title: "Oops! Sesuatu telah terjadi",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <Layout centerX centerY className="space-y-5">
      <Card className="w-full md:max-w-md lg:max-w-lg">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form data-testid="form-profile" className="space-y-8 mt-10">
              <CustomFormField
                control={form.control}
                name="email"
                label="Email"
              >
                {(field) => (
                  <Input
                    {...field}
                    data-testid="input-email"
                    placeholder="name@mail.com"
                    type="email"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    value={field.value as string}
                    readOnly
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
                    readOnly
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
                  disabled
                  options={[
                    {
                      label: "Male",
                      value: "male",
                    },
                    {
                      label: "Female",
                      value: "female",
                    },
                  ]}
                />
                <CustomFormSelect
                  data-testid="input-status"
                  control={form.control}
                  name="marriage_status"
                  label="Status"
                  placeholder="Pilih status"
                  disabled
                  options={[
                    {
                      label: "Menikah",
                      value: "married",
                    },
                    {
                      label: "Belum menikah",
                      value: "not_married",
                    },
                    {
                      label: "Cerai",
                      value: "divorce",
                    },
                  ]}
                />
              </div>
              <CustomFormDatePicker
                data-testid="input-dob"
                control={form.control}
                name="dob"
                label="Tanggal lahir"
                placeholder="mm/dd/yyyy"
                disabled
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
                    readOnly
                  />
                )}
              </CustomFormField>
              <CustomFormSelect
                data-testid="input-nationality"
                control={form.control}
                name="nationality"
                label="Kewarganegaraan"
                placeholder="Kewarganegaraan"
                disabled
                options={countries}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Profile;
