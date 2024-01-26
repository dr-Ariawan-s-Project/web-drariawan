import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { Layout } from '@/components/layout';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/data-table';
import Alert from '@/components/alert';
import ModalPatient from './module/modal-patient';

import {
  getPatients,
  deletePatient,
  postPatient,
  updatePatient,
} from '@/utils/apis/patient/api';
import { IPatient, PatientSchema } from '@/utils/apis/patient/types';
import { IPagination } from '@/utils/types/api';
import { useAuthStore } from '@/utils/states';

const DashboardPatients = () => {
  const [searchParams] = useSearchParams();
  const role = useAuthStore((state) => state.role);
  const { toast } = useToast();

  const [data, setData] = useState<IPatient[]>([]);
  const [selectedData, setSelectedData] = useState<IPatient>();
  const [pagination, setPagination] = useState<IPagination>();
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const checkRole = useMemo(() => {
    return ['superadmin'].includes(role);
  }, [role]);

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
                <DropdownMenuTrigger data-testid="table-action" asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    data-testid="action-edit"
                    onClick={() => {
                      setSelectedData(row.original);
                      setShowDialog(true);
                    }}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    data-testid="action-delete"
                    onClick={() => {
                      setSelectedData(row.original);
                      setShowDeleteDialog(true);
                    }}
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

      const result = await getPatients({ ...query, limit: 10 });

      setData(result.data);
      setPagination(result.pagination);
    } catch (error) {
      toast({
        title: 'Oops! Sesuatu telah terjadi',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  }

  async function onSubmitData(data: PatientSchema) {
    try {
      const result = selectedData
        ? await updatePatient(data, selectedData.id)
        : await postPatient(data);

      toast({
        description: result.messages[0],
      });

      fetchData();
      setSelectedData(undefined);
      setShowDialog(false);
    } catch (error) {
      toast({
        title: 'Oops! Sesuatu telah terjadi',
        description: (error as Error).message.toString(),
        variant: 'destructive',
      });
    }
  }

  async function onDeleteData(id_patient: string) {
    try {
      const result = await deletePatient(id_patient);

      toast({
        description: result.messages[0],
      });

      fetchData();
      setSelectedData(undefined);
      setShowDeleteDialog(false);
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
            Tambah pasien
          </Button>
        </div>
      ) : null}
      <DataTable
        columns={columns}
        data={data}
        noFoundMessage="Tidak ada data tersedia"
      />
      <Pagination meta={pagination} />
      <Alert
        open={showDeleteDialog}
        title="Peringatan"
        description={`Apakah anda yakin ingin menghapus data "${selectedData?.name}"?`}
        onAction={() => onDeleteData(selectedData?.id!)}
        onCancel={() => {
          setSelectedData(undefined);
          setShowDeleteDialog(false);
        }}
      />
      <ModalPatient
        open={showDialog}
        onOpenChange={setShowDialog}
        editData={selectedData}
        onSubmit={(data) => onSubmitData(data)}
      />
    </Layout>
  );
};

export default DashboardPatients;
