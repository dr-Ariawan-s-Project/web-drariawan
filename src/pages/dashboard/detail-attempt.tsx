import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { useToast } from '@/components/ui/use-toast';
import DataTable from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout';
import ModalAttempt from './module/modal-attempt';

import {
  getAttemptAnswers,
  postAttemptAssessments,
} from '@/utils/apis/questionnaire/api';
import {
  AssessmentSchema,
  IAttemptAnswer,
} from '@/utils/apis/questionnaire/types';
import { useAuthStore } from '@/utils/states';

const DetailAttempt = () => {
  const { attempt_id } = useParams() as { attempt_id: string };
  const role = useAuthStore((state) => state.role);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [data, setData] = useState<IAttemptAnswer[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  const checkRole = useMemo(() => {
    return ['dokter'].includes(role);
  }, [role]);

  const columns = useMemo<ColumnDef<IAttemptAnswer>[]>(
    () => [
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

  async function onSubmitData(data: AssessmentSchema) {
    try {
      const result = await postAttemptAssessments(data, attempt_id);

      toast({
        description: result.messages[0],
      });
      navigate('/dashboard/questionnaires');
    } catch (error) {
      toast({
        title: 'Oops! Sesuatu telah terjadi',
        description: (error as Error).message.toString(),
        variant: 'destructive',
      });
    }
  }

  return (
    <Layout variant="admin">
      {checkRole ? (
        <div className="w-full flex justify-end">
          <Button
            data-testid="btn-add-data"
            onClick={() => setShowDialog(true)}
          >
            Tambah Asesmen
          </Button>
        </div>
      ) : null}
      <DataTable
        columns={columns}
        data={data}
        noFoundMessage="Tidak ada data tersedia"
        manualPagination={true}
      />
      <ModalAttempt
        open={showDialog}
        onOpenChange={setShowDialog}
        onSubmit={(data) => onSubmitData(data)}
      />
    </Layout>
  );
};

export default DetailAttempt;
