import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { format, parseISO } from 'date-fns';
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
import AddEditBooking from './module/add-edit-booking';

import {
  deleteBooking,
  getBooking,
  postBooking,
  updateBooking,
} from '@/utils/apis/books/api';
import { BookingSchema, IBook } from '@/utils/apis/books/types';
import useAuthStore from '@/utils/states/auth';

const DashboardBooks = () => {
  const [searchParams] = useSearchParams();
  const role = useAuthStore((state) => state.role);
  const { toast } = useToast();

  const [data, setData] = useState<IBook[]>([]);
  const [selectedData, setSelectedData] = useState<IBook>();
  const [showAddEditDialog, setShowAddEditDialog] = useState(false);

  const columns = useMemo<ColumnDef<IBook>[]>(
    () => [
      {
        accessorKey: 'booking_code',
        header: 'Kode Booking',
      },
      {
        accessorKey: 'patient.name',
        header: 'Nama Pasien',
      },
      {
        accessorKey: 'patient.email',
        header: 'Email Pasien',
      },
      {
        accessorKey: 'booking_date',
        header: 'Tanggal Booking',
        cell: (info) =>
          format(
            parseISO(info.row.getValue('booking_date')),
            'EEEE, dd MMMM yyyy'
          ),
      },
      {
        accessorKey: 'schedule.user.name',
        header: 'Nama Dokter',
      },
      {
        accessorKey: 'state',
        header: 'Status',
        cell: (info) => {
          const cellValue = info.row.original.state;

          return (
            <Badge
              variant="outline"
              className={
                cellValue === 'confirmed' ? 'bg-green-400' : 'bg-red-400'
              }
            >
              {capitalize(cellValue)}
            </Badge>
          );
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
                <DropdownMenuItem onClick={() => setSelectedData(row.original)}>
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
      const query = Object.fromEntries([...searchParams]);

      const result = await getBooking({ ...query });

      setData(result.data);
    } catch (error) {
      toast({
        title: 'Oops! Sesuatu telah terjadi',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  async function onSubmitData(data: BookingSchema) {
    try {
      const result = selectedData
        ? await updateBooking(data, selectedData.id)
        : await postBooking(data);

      toast({
        description: result.messages[0],
      });

      fetchData();
      setShowAddEditDialog(false);
      setSelectedData(undefined);
    } catch (error) {
      toast({
        title: 'Oops! Sesuatu telah terjadi',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  }

  async function onDeleteData(id_schedule: string) {
    try {
      const result = await deleteBooking(id_schedule);

      toast({
        description: result.messages[0],
      });

      fetchData();
      setSelectedData(undefined);
    } catch (error) {
      toast({
        title: 'Oops! Sesuatu telah terjadi',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  }

  return (
    <AdminLayout className="space-y-4" showMenu>
      {['suster'].includes(role) && (
        <div className="w-full flex justify-end">
          <Button onClick={() => setShowAddEditDialog(true)}>
            Tambah booking
          </Button>
        </div>
      )}
      <DataTable
        columns={columns}
        data={data}
        noFoundMessage="Tidak ada data tersedia"
      />
      <Pagination />
      <Alert
        open={selectedData && showAddEditDialog ? true : false}
        title="Peringatan"
        description={`Apakah anda yakin ingin menghapus booking "${selectedData?.booking_code}"?`}
        onAction={() => onDeleteData(selectedData?.id!)}
        onCancel={() => setSelectedData(undefined)}
      />
      <AddEditBooking
        open={showAddEditDialog}
        onOpenChange={setShowAddEditDialog}
        editData={selectedData}
        onSubmit={(data) => onSubmitData(data)}
      />
    </AdminLayout>
  );
};

export default DashboardBooks;
