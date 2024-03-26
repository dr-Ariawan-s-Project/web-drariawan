import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { format, parseISO } from "date-fns";
import { capitalize } from "lodash";

import { useToast } from "@/components/ui/use-toast";
import { Layout } from "@/components/layout";
import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getQuestionnaireAttempt } from "@/utils/apis/questionnaire/api";
import { IAttempt } from "@/utils/apis/questionnaire/types";
import { IPagination } from "@/utils/types/api";

const ListKuisioner = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [data, setData] = useState<IAttempt[]>([]);
  const [pagination, setPagination] = useState<IPagination>();

  const columns = useMemo<ColumnDef<IAttempt>[]>(
    () => [
      {
        accessorKey: "",
        header: "No",
        cell: ({ row }) => {
          return (pagination?.page! - 1) * pagination?.limit! + row.index + 1;
        },
      },
      {
        accessorKey: "patient.name",
        header: "Nama Pasien",
        cell: ({ row }) => {
          const cellValue = row.original.patient.name;

          return cellValue ? cellValue : "-";
        },
      },
      {
        accessorKey: "patient.email",
        header: "Email Pasien",
      },
      {
        accessorKey: "created_at",
        header: "Diambil",
        cell: (info) =>
          format(parseISO(info.row.getValue("created_at")), "PPpp"),
      },
      {
        accessorKey: "diagnosis",
        header: "Diagnosis",
        cell: ({ row }) => {
          const cellValue = row.original.diagnosis;

          return cellValue ? cellValue : "-";
        },
      },
      {
        accessorKey: "feedback",
        header: "Feedback",
        cell: ({ row }) => {
          const cellValue = row.original.feedback;

          return cellValue ? cellValue : "-";
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const cellValue = row.original.status;

          return capitalize(cellValue ? cellValue : "-");
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const { id, created_at, updated_at } = row.original;

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
                    data-testid="action-detail"
                    onClick={() => navigate(`/dashboard/questionnaires/${id}`)}
                    disabled={created_at === updated_at}
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
    [pagination]
  );

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const query = Object.fromEntries(
        [...searchParams].filter((param) => param[0] !== "tab")
      );

      const result = await getQuestionnaireAttempt({ ...query });

      setData(result.data);
      setPagination(result.pagination);
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
      <DataTable
        columns={columns}
        data={data}
        noFoundMessage="Tidak ada data tersedia"
      />
      <Pagination meta={pagination} />
    </Layout>
  );
};

export default ListKuisioner;
