import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { AdminLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';

import { getAttemptAnswers } from '@/utils/apis/questionnaire/api';

const DetailAttempt = () => {
  const { toast } = useToast();
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getAttemptAnswers(params.attempt_id as string);

      //   setData(result.data);
    } catch (error) {
      toast({
        title: 'Oops! Sesuatu telah terjadi',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  }

  return (
    <AdminLayout>
      <p>Test</p>
    </AdminLayout>
  );
};

export default DetailAttempt;
