import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import {
  CustomFormField,
  CustomFormCheckbox,
} from "@/components/custom-formfield";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/layout";
import { Form } from "@/components/ui/form";

import { LoginSchema, loginSchema } from "@/utils/apis/auth/types";
import { setAxiosConfig } from "@/utils/apis/axiosWithConfig";
import { adminLogin } from "@/utils/apis/auth/api";
import { useAuthStore } from "@/utils/states";

const AdminLogin = () => {
  const addAuth = useAuthStore((state) => state.addAuth);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  async function onSubmit(data: LoginSchema) {
    try {
      const result = await adminLogin(data);
      toast({
        description: `Halo ${result.data.name}, selamat datang kembali`,
      });
      addAuth(result.data, data.remember);
      setAxiosConfig(result.data.token);
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Oops! Sesuatu telah terjadi",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }

  return (
    <Layout centerX centerY>
      <div className="mx-auto max-w-md w-full">
        <p className="font-medium text-center text-xl">Login</p>
        <p className="font-bold mt-2 text-center text-health-blue-dark text-3xl">
          ADMIN
        </p>
      </div>
      <Form {...form}>
        <form
          data-testid="form-login"
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-sm space-y-8 mt-10 w-full md:max-w-md lg:max-w-lg"
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
          <div className="flex justify-between items-center">
            <CustomFormCheckbox
              control={form.control}
              name="remember"
              label="Remember me"
            />
            <Button variant="link" asChild>
              <Link to="">Forgot Password</Link>
            </Button>
          </div>
          <div className="flex flex-col mt-20">
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
                "Login"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Layout>
  );
};

export default AdminLogin;
