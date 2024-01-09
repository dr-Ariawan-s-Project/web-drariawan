import { useSearchParams } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { AdminLayout } from '@/components/layout';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { getPatients } from '@/utils/apis/dashboard/api';
import { IPatient } from '@/utils/apis/dashboard/types';
import useAuthStore from '@/utils/states/auth';

const DashboardPatients = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const role = useAuthStore((state) => state.role);
  const { toast } = useToast();

  const [patients, setPatients] = useState<IPatient[]>([]);

  const columns: ColumnDef<IPatient>[] = [
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
              <DropdownMenuItem>Hapus</DropdownMenuItem>
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

      const result = await getPatients({ ...query });
      setPatients(result.data);
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
          <Button>Tambah pasien</Button>
        </div>
      )}
      <DataTable
        columns={columns}
        data={patients}
        noFoundMessage="Tidak ada data tersedia"
      />
      <Pagination />
    </AdminLayout>
  );
};

export default DashboardPatients;
