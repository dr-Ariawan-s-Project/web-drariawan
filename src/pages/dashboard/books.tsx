import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { format, parseISO } from "date-fns";
import { capitalize } from "lodash";

import { useToast } from "@/components/ui/use-toast";
import { Layout } from "@/components/layout";
import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import Alert from "@/components/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ModalBooking from "./module/modal-booking";

import {
  cancelBooking,
  deleteBooking,
  getBooking,
  postBooking,
  updateBooking,
} from "@/utils/apis/books/api";
import { BookingSchema, IBook } from "@/utils/apis/books/types";
import { IPagination } from "@/utils/types/api";
import { useAuthStore } from "@/utils/states";

const DashboardBooks = () => {
  const [searchParams] = useSearchParams();
  const role = useAuthStore((state) => state.role);
  const { toast } = useToast();

  const [data, setData] = useState<IBook[]>([]);
  const [pagination, setPagination] = useState<IPagination>();
  const [selectedData, setSelectedData] = useState<IBook>();
  const [showAddEditDialog, setShowAddEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const checkRole = useMemo(() => {
    return ["suster"].includes(role);
  }, [role]);

  const columns = useMemo<ColumnDef<IBook>[]>(
    () => [
      {
        accessorKey: "",
        header: "No",
        cell: ({ row }) => {
          return (pagination?.page! - 1) * pagination?.limit! + row.index + 1;
        },
      },
      {
        accessorKey: "booking_code",
        header: "Kode Booking",
      },
      {
        accessorKey: "patient.name",
        header: "Nama Pasien",
      },
      {
        accessorKey: "patient.email",
        header: "Email Pasien",
      },
      {
        accessorKey: "booking_date",
        header: "Tanggal Booking",
        cell: (info) => {
          const cellValue = info.row.original.booking_date;

          return cellValue
            ? format(parseISO(cellValue), "EEEE, dd MMMM yyyy")
            : "-";
        },
      },
      {
        accessorKey: "schedule.user.name",
        header: "Nama Dokter",
      },
      {
        accessorKey: "state",
        header: "Status",
        cell: (info) => {
          const cellValue = info.row.original.state;

          return (
            <Badge
              variant="outline"
              className={
                cellValue === "confirmed" ? "bg-green-400" : "bg-red-400"
              }
            >
              {capitalize(cellValue)}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          return (
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
                    setShowAddEditDialog(true);
                  }}
                  disabled={!checkRole}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  data-testid="action-cancel"
                  onClick={() => {
                    setSelectedData(row.original);
                    setShowCancelDialog(true);
                  }}
                  disabled={!checkRole}
                >
                  Batal
                </DropdownMenuItem>
                <DropdownMenuItem
                  data-testid="action-delete"
                  onClick={() => {
                    setSelectedData(row.original);
                    setShowDeleteDialog(true);
                  }}
                  disabled={!checkRole}
                >
                  Hapus
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
      const query = Object.fromEntries([...searchParams]);

      const result = await getBooking({ ...query });

      setData(result.data);
      setPagination(result.pagination);
    } catch (error) {
      toast({
        title: "Oops! Sesuatu telah terjadi",
        description: (error as Error).message,
        variant: "destructive",
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
        title: "Oops! Sesuatu telah terjadi",
        description: (error as Error).message,
        variant: "destructive",
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
      setShowDeleteDialog(false);
    } catch (error) {
      toast({
        title: "Oops! Sesuatu telah terjadi",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }

  async function onCancelData(id_schedule: string) {
    try {
      const result = await cancelBooking(id_schedule);

      toast({
        description: result.messages[0],
      });

      fetchData();
      setSelectedData(undefined);
      setShowCancelDialog(false);
    } catch (error) {
      toast({
        title: "Oops! Sesuatu telah terjadi",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }

  return (
    <Layout variant="admin">
      {checkRole ? (
        <div className="w-full flex justify-end">
          <Button
            data-testid="btn-add-data"
            onClick={() => setShowAddEditDialog(true)}
          >
            Tambah booking
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
        open={showDeleteDialog || showCancelDialog}
        title="Peringatan"
        description={`Apakah anda yakin ingin ${
          showDeleteDialog ? "menghapus" : "membatalkan"
        } booking "${selectedData?.booking_code}"?`}
        onAction={() =>
          showDeleteDialog
            ? onDeleteData(selectedData?.id!)
            : onCancelData(selectedData?.id!)
        }
        onCancel={() => {
          setSelectedData(undefined);
          showDeleteDialog
            ? setShowDeleteDialog(false)
            : setShowCancelDialog(false);
        }}
      />
      <ModalBooking
        open={showAddEditDialog}
        onOpenChange={setShowAddEditDialog}
        editData={selectedData}
        onSubmit={(data) => onSubmitData(data)}
      />
    </Layout>
  );
};

export default DashboardBooks;
