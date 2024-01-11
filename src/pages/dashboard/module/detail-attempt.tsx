import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { AdminLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';

import { getAttemptAnswers } from '@/utils/apis/questionnaire/api';
import { IAttemptAnswer } from '@/utils/apis/questionnaire/types';

const DetailAttempt = () => {
  const { toast } = useToast();
  const { attempt_id } = useParams() as { attempt_id: string };

  const [data, setData] = useState<IAttemptAnswer[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getAttemptAnswers(attempt_id);

      setData(result.data);
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
      {/* TODO: Change this when we know what showed to user */}
      <p>Jawaban responden</p>
      <ol className="list-decimal">
        {data.map((answer) => (
          <li key={answer.id}>
            <p>{answer.question.question}</p>
            <p>{answer.description}</p>
          </li>
        ))}
      </ol>
    </AdminLayout>
  );
};

export default DetailAttempt;
