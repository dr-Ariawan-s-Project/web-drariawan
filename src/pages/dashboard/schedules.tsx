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
import { AdminLayout } from '@/components/layout';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/data-table';
import Alert from '@/components/alert';
import AddEditSchedule from './module/add-edit-schedule';

import {
  getSchedules,
  deleteSchedule,
  updateSchedule,
  postSchedule,
} from '@/utils/apis/schedule/api';
import { ISchedule, ScheduleSchema } from '@/utils/apis/schedule/types';
import useAuthStore from '@/utils/states/auth';

const DashboardSchedules = () => {
  const [searchParams] = useSearchParams();
  const role = useAuthStore((state) => state.role);
  const { toast } = useToast();

  const [users, setUsers] = useState<ISchedule[]>([]);
  const [selectedData, setSelectedData] = useState<ISchedule>();
  const [showAddEditDialog, setShowAddEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const columns = useMemo<ColumnDef<ISchedule>[]>(
    () => [
      {
        accessorKey: 'user.name',
        header: 'Nama Doktor',
      },
      {
        accessorKey: 'day',
        header: 'Hari Jadwal',
      },
      {
        accessorKey: 'health_care_address',
        header: 'Alamat',
      },
      {
        accessorKey: '',
        header: 'Waktu',
        cell: ({ row }) => {
          const { time_start, time_end } = row.original;
          return `${time_start} - ${time_end}`;
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedData(row.original);
                    setShowAddEditDialog(true);
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedData(row.original);
                    setShowDeleteDialog(true);
                  }}
                >
                  Hapus
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const query = Object.fromEntries(
        [...searchParams].filter((param) => param[0] !== 'tab')
      );

      const result = await getSchedules({ ...query });
      setUsers(result.data);
    } catch (error) {
      toast({
        title: 'Oops! Sesuatu telah terjadi',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  async function onSubmitData(data: ScheduleSchema) {
    try {
      const result = selectedData
        ? await updateSchedule(data)
        : await postSchedule(data);
      toast({
        description: result.messages[0],
      });
      fetchData();
      setShowAddEditDialog(false);
    } catch (error: any) {
      toast({
        title: 'Oops! Something went wrong.',
        description: error.message.toString(),
        variant: 'destructive',
      });
    }
  }

  async function onDeleteUser(id_schedule: number) {
    try {
      const result = await deleteSchedule(id_schedule);
      toast({
        description: result.messages[0],
      });
      fetchData();
      setSelectedData(undefined);
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
      {['superadmin', 'dokter', 'admin'].includes(role) && (
        <div className="w-full flex justify-end">
          <Button onClick={() => setShowAddEditDialog(true)}>
            Tambah jadwal
          </Button>
        </div>
      )}
      <DataTable
        columns={columns}
        data={users}
        noFoundMessage="Tidak ada data tersedia"
      />
      <Pagination />
      <Alert
        open={showDeleteDialog}
        title="Peringatan"
        description={`Apakah anda yakin ingin menghapus jadwal "${selectedData?.user.name} pada hari ${selectedData?.day}"?`}
        onAction={() => onDeleteUser(selectedData?.schedule_id!)}
        onCancel={() => {
          setSelectedData(undefined);
          setShowDeleteDialog(false);
        }}
      />
      <AddEditSchedule
        open={showAddEditDialog}
        onOpenChange={setShowAddEditDialog}
        editData={selectedData}
        onSubmit={(data) => onSubmitData(data)}
      />
    </AdminLayout>
  );
};

export default DashboardSchedules;
