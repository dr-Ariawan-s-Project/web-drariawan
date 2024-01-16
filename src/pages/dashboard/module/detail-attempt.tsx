import { useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useParams } from 'react-router-dom';

import { useToast } from '@/components/ui/use-toast';
import { AdminLayout } from '@/components/layout';

import { getAttemptAnswers } from '@/utils/apis/questionnaire/api';
import { IAttemptAnswer } from '@/utils/apis/questionnaire/types';
import DataTable from '@/components/data-table';

const DetailAttempt = () => {
  const { toast } = useToast();
  const { attempt_id } = useParams() as { attempt_id: string };

  const [data, setData] = useState<IAttemptAnswer[]>([]);

  const columns = useMemo<ColumnDef<IAttemptAnswer>[]>(
    () => [
      // {
      //   accessorKey: '',
      //   header: 'No',
      //   cell: ({ row }) => {
      //     return (pagination?.page! - 1) * pagination?.limit! + row.index + 1;
      //   },
      // },
      {
        accessorKey: 'question.question',
        header: 'Pertanyaan',
      },
      {
        accessorKey: 'description',
        header: 'Jawaban',
        cell: ({ row }) => {
          const cellValue = row.original.description;

          return cellValue ? cellValue : '-';
        },
      },
      {
        accessorKey: 'score',
        header: 'Skor',
      },
    ],
    []
  );

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
      <DataTable
        columns={columns}
        data={data}
        noFoundMessage="Tidak ada data tersedia"
        manualPagination={true}
      />
      {/* <ol className="list-decimal">
        {data.map((answer) => (
          <li key={answer.id}>
            <p>{answer.question.question}</p>
            <p>{answer.description}</p>
          </li>
        ))}
      </ol> */}
    </AdminLayout>
  );
};

export default DetailAttempt;
