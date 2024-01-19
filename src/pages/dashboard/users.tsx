import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { capitalize } from 'lodash';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout';
import Alert from '@/components/alert';
import ModalUser from './module/modal-user';

import { getUsers, postUser, deactivateUser } from '@/utils/apis/user/api';
import { IUser, UserSchema } from '@/utils/apis/user/types';
import { IPagination } from '@/utils/types/api';
import { useAuthStore } from '@/utils/states';

const DashboardUsers = () => {
  const [searchParams] = useSearchParams();
  const role = useAuthStore((state) => state.role);
  const { toast } = useToast();

  const [data, setData] = useState<IUser[]>([]);
  const [pagination, setPagination] = useState<IPagination>();
  const [selectedData, setSelectedData] = useState<IUser>();
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const checkRole = useMemo(() => {
    return ['superadmin'].includes(role);
  }, [role]);

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
        cell: ({ row }) => {
          const { name, picture } = row.original;

          return (
            <div className="flex gap-3 items-center">
              <Avatar>
                <AvatarImage src={picture} />
                <AvatarFallback>KS</AvatarFallback>
              </Avatar>
              <p>{name}</p>
            </div>
          );
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
                <DropdownMenuTrigger data-testid="table-action" asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
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

      const result = await getUsers({ ...query });

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

  async function onSubmitData(data: UserSchema) {
    try {
      const result = await postUser(data);

      toast({
        description: result.messages[0],
      });

      fetchData();
      setShowDialog(false);
    } catch (error) {
      toast({
        title: 'Oops! Sesuatu telah terjadi',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  }

  async function onDeleteData(id_user: number) {
    try {
      const result = await deactivateUser(id_user);

      toast({
        description: result.messages[0],
      });

      fetchData();
      setSelectedData(undefined);
      setShowDeleteDialog(false);
    } catch (error) {
      toast({
        title: 'Oops! Sesuatu telah terjadi',
        description: (error as Error).message,
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
            Tambah user
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
      <ModalUser
        open={showDialog}
        onOpenChange={setShowDialog}
        editData={selectedData}
        onSubmit={(data) => onSubmitData(data)}
      />
    </Layout>
  );
};

export default DashboardUsers;
