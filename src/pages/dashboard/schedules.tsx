import { useSearchParams } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';
import { capitalize } from 'lodash';

import { useToast } from '@/components/ui/use-toast';
import { AdminLayout } from '@/components/layout';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { getSchedules } from '@/utils/apis/schedule/api';
import { ISchedule } from '@/utils/apis/schedule/types';
import useAuthStore from '@/utils/states/auth';

const DashboardSchedules = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const role = useAuthStore((state) => state.role);
  const { toast } = useToast();

  const [users, setUsers] = useState<ISchedule[]>([]);

  const columns: ColumnDef<ISchedule>[] = [
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
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Hapus pengguna</DropdownMenuItem>
              <DropdownMenuItem>TEST 2</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

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

  return (
    <AdminLayout className="space-y-4" showMenu>
      {['superadmin'].includes(role) && (
        <div className="w-full flex justify-end">
          <Button>Tambah user</Button>
        </div>
      )}
      <DataTable
        columns={columns}
        data={users}
        noFoundMessage="Tidak ada data tersedia"
      />
      <Pagination />
    </AdminLayout>
  );
};

export default DashboardSchedules;
