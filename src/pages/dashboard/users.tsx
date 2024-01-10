import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { capitalize } from 'lodash';

import { useToast } from '@/components/ui/use-toast';
import { AdminLayout } from '@/components/layout';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import Alert from '@/components/alert';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AddEditUser from './module/add-edit-user';

import { IUser, UserSchema } from '@/utils/apis/user/types';
import { IPagination } from '@/utils/types/api';
import useAuthStore from '@/utils/states/auth';
import {
  getUsers,
  postUser,
  updateUser,
  deactivateUser,
} from '@/utils/apis/user/api';

const DashboardUsers = () => {
  const [searchParams] = useSearchParams();
  const role = useAuthStore((state) => state.role);
  const { toast } = useToast();

  const [users, setUsers] = useState<IUser[]>([]);
  const [pagination, setPagination] = useState<IPagination>();
  const [selectedData, setSelectedData] = useState<IUser>();
  const [showAddEditDialog, setShowAddEditDialog] = useState(false);

  const columns = useMemo<ColumnDef<IUser>[]>(
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
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => {
          const cellValue = row.original.role;

          return <Badge variant="outline">{capitalize(cellValue)}</Badge>;
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
                    onClick={() => setSelectedData(row.original)}
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

  const fetchData = async () => {
    try {
      const query = Object.fromEntries(
        [...searchParams].filter((param) => param[0] !== 'tab')
      );

      const result = await getUsers({ ...query });
      setUsers(result.data);
      setPagination(result.pagination);
    } catch (error) {
      toast({
        title: 'Oops! Sesuatu telah terjadi',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  async function onSubmitData(data: UserSchema) {
    try {
      const result = selectedData
        ? await updateUser(data)
        : await postUser(data);
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

  async function onDeleteUser(id_user: number) {
    try {
      const result = await deactivateUser(id_user);
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
      {['superadmin'].includes(role) && (
        <div className="w-full flex justify-end">
          <Button onClick={() => setShowAddEditDialog(true)}>
            Tambah user
          </Button>
        </div>
      )}
      <DataTable
        columns={columns}
        data={users}
        noFoundMessage="Tidak ada data tersedia"
      />
      <Pagination meta={pagination} />
      <Alert
        open={selectedData ? true : false}
        title="Peringatan"
        description={`Apakah anda yakin ingin menghapus data "${selectedData?.name}"?`}
        onAction={() => onDeleteUser(selectedData?.id!)}
        onCancel={() => setSelectedData(undefined)}
      />
      <AddEditUser
        open={showAddEditDialog}
        onOpenChange={setShowAddEditDialog}
        editData={selectedData}
        onSubmit={(data) => onSubmitData(data)}
      />
    </AdminLayout>
  );
};

export default DashboardUsers;
