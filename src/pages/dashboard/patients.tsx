import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { useToast } from '@/components/ui/use-toast';
import { AdminLayout } from '@/components/layout';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/data-table';
import Alert from '@/components/alert';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { getPatients, deletePatient } from '@/utils/apis/patient/api';
import { IPatient } from '@/utils/apis/patient/types';
import { IPagination } from '@/utils/types/api';
import useAuthStore from '@/utils/states/auth';

const DashboardPatients = () => {
  const [searchParams] = useSearchParams();
  const role = useAuthStore((state) => state.role);
  const { toast } = useToast();

  const [patients, setPatients] = useState<IPatient[]>([]);
  const [pagination, setPagination] = useState<IPagination>();
  const [showDeleteDialog, setShowDeleteDialog] = useState<IPatient>();

  const columns = useMemo<ColumnDef<IPatient>[]>(
    () => [
      {
        accessorKey: '',
        header: 'No',
        cell: ({ row }) => {
          return (pagination?.page! - 1) * pagination?.limit! + row.index + 1;
        },
      },
      {
        accessorKey: 'name',
        header: 'Nama',
        cell: ({ row }) => {
          const cellValue = row.original.name;

          return cellValue ? cellValue : '-';
        },
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'phone',
        header: 'Nomor Telepon',
        cell: ({ row }) => {
          const cellValue = row.original.phone;

          return cellValue !== '' ? cellValue : '-';
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => {
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
                    onClick={() => setShowDeleteDialog(row.original)}
                  >
                    Hapus
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          );
        },
      },
    ],
    [pagination]
  );

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const query = Object.fromEntries(
        [...searchParams].filter((param) => param[0] !== 'tab')
      );

      const result = await getPatients({ ...query });
      setPatients(result.data);
      setPagination(result.pagination);
    } catch (error) {
      toast({
        title: 'Oops! Sesuatu telah terjadi',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  }

  async function onDelete(id_patient: string) {
    try {
      const result = await deletePatient(id_patient);
      toast({
        description: result.messages[0],
      });
      fetchData();
      setShowDeleteDialog(undefined);
    } catch (error: any) {
      toast({
        title: 'Oops! Something went wrong.',
        description: error.message.toString(),
        variant: 'destructive',
      });
    }
  }

  return (
    <AdminLayout className="space-y-4" showMenu>
      {['superadmin'].includes(role) && (
        <div className="w-full flex justify-end">
          {/* TODO: Add functionality to add and update patient */}
          <Button>Tambah pasien</Button>
        </div>
      )}
      <DataTable
        columns={columns}
        data={patients}
        noFoundMessage="Tidak ada data tersedia"
      />
      <Pagination meta={pagination} />
      <Alert
        open={showDeleteDialog ? true : false}
        title="Peringatan"
        description={`Apakah anda yakin ingin menghapus data "${showDeleteDialog?.name}"?`}
        onAction={() => onDelete(showDeleteDialog?.id!)}
        onCancel={() => setShowDeleteDialog(undefined)}
      />
    </AdminLayout>
  );
};

export default DashboardPatients;
