import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

import {
  CustomFormField,
  CustomFormSelect,
} from '@/components/custom-formfield';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import { Layout } from '@/components/layout';
import {
  QuestionnaireSchema,
  questionnaireSchema,
} from '@/utils/apis/questionnaire/types';
import { validateQuestionaire } from '@/utils/apis/questionnaire/api';
import { forWho } from '@/utils/constants';

const DataDiri = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<QuestionnaireSchema>({
    resolver: zodResolver(questionnaireSchema),
    defaultValues: {
      email: '',
      phone: '',
      as: 'myself',
    },
  });

  async function onSubmit(data: QuestionnaireSchema) {
    try {
      await validateQuestionaire(data);
      navigate('/questionnaire/sent', {
        state: { email: data.email },
      });
    } catch (error) {
      toast({
        title: 'Oops! Sesuatu telah terjadi',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  }

  return (
    <Layout centerX centerY>
      <p className="font-bold text-center mb-4 text-4xl">Input Data</p>
      <p className="text-lg lg:text-xl text-center">
        Silakan mengisi formulir ini dengan informasi yang diperlukan
      </p>
      <Form {...form}>
        <form
          data-testid="form-questionnaire"
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
              />
            )}
          </CustomFormField>
          <CustomFormSelect
            data-testid="input-option"
            control={form.control}
            name="as"
            label="Data ini untuk siapa?"
            placeholder="Pilih"
            options={forWho}
          />
          {form.watch('as') === 'partner' && (
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
                />
              )}
            </CustomFormField>
          )}
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
                'Selanjutnya'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Layout>
  );
};

export default DataDiri;
