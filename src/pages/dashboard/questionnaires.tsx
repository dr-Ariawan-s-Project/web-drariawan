import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { useToast } from '@/components/ui/use-toast';
import { AdminLayout } from '@/components/layout';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { IAttempt } from '@/utils/apis/questionnaire/types';
import useAuthStore from '@/utils/states/auth';
import { getQuestionnaireAttempt } from '@/utils/apis/questionnaire/api';

const ListKuisioner = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const role = useAuthStore((state) => state.role);
  const { toast } = useToast();

  const [data, setData] = useState<IAttempt[]>([]);

  const columns = useMemo<ColumnDef<IAttempt>[]>(
    () => [
      // TODO: Uncomment this when pagination is added
      // {
      //   accessorKey: '',
      //   header: 'No',
      //   cell: ({ row }) => {
      //     return (pagination?.page! - 1) * pagination?.limit! + row.index + 1;
      //   },
      // },
      {
        accessorKey: 'patient.name',
        header: 'Nama Pasien',
        cell: ({ row }) => {
          const cellValue = row.original.patient.name;

          return cellValue ? cellValue : '-';
        },
      },
      {
        accessorKey: 'patient.email',
        header: 'Email Pasien',
      },
      {
        accessorKey: 'score',
        header: 'Skor',
      },
      {
        accessorKey: 'diagnosis',
        header: 'Diagnosis',
        cell: ({ row }) => {
          const cellValue = row.original.diagnosis;

          return cellValue ? cellValue : '-';
        },
      },
      {
        accessorKey: 'feedback',
        header: 'Feedback',
        cell: ({ row }) => {
          const cellValue = row.original.feedback;

          return cellValue ? cellValue : '-';
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const cellValue = row.original.status;

          return cellValue ? cellValue : '-';
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const { id, status } = row.original;

          return (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => navigate(`/dashboard/questionnaires/${id}`)}
                    disabled={!status}
                  >
                    Detail
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const query = Object.fromEntries(
        [...searchParams].filter((param) => param[0] !== 'tab')
      );

      const result = await getQuestionnaireAttempt({ ...query });

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
      <DataTable
        columns={columns}
        data={data}
        noFoundMessage="Tidak ada data tersedia"
      />
      {/* TODO: Add pagination */}
      <Pagination />
    </AdminLayout>
  );
};

export default ListKuisioner;
