import { useSearchParams, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { useToast } from "@/components/ui/use-toast";
import Pagination from "@/components/pagination";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout";
import ModalAttempt from "./module/modal-attempt";

import {
  getAttempt,
  getAttemptAnswers,
  postAttemptAssessments,
} from "@/utils/apis/questionnaire/api";
import {
  AssessmentSchema,
  IAttempt,
  IAttemptAnswer,
} from "@/utils/apis/questionnaire/types";
import { useAuthStore } from "@/utils/states";
import { IPagination } from "@/utils/types/api";

const DetailAttempt = () => {
  const { attempt_id } = useParams() as { attempt_id: string };
  const role = useAuthStore((state) => state.role);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const [data, setData] = useState<IAttempt>();
  const [pagination, setPagination] = useState<IPagination>();
  const [answers, setAnswers] = useState<IAttemptAnswer[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  const checkRole = useMemo(() => {
    return ["dokter"].includes(role);
  }, [role]);

  const columns = useMemo<ColumnDef<IAttemptAnswer>[]>(
    () => [
      {
        accessorKey: "question_id",
        header: "No",
      },
      {
        accessorKey: "question.question",
        header: "Pertanyaan",
      },
      {
        accessorKey: "description",
        header: "Jawaban",
        cell: ({ row }) => {
          const cellValue = row.original.description;

          return cellValue ? cellValue : "-";
        },
      },
      {
        accessorKey: "score",
        header: "Skor",
      },
    ],
    [pagination]
  );

  useEffect(() => {
    fetchData();
    fetchAnswers();
  }, []);

  async function fetchData() {
    try {
      const result = await getAttempt(attempt_id);

      setData(result.data);
    } catch (error) {
      toast({
        title: "Oops! Sesuatu telah terjadi",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }

  async function fetchAnswers() {
    try {
      const query = Object.fromEntries(
        [...searchParams].filter((param) => param[0] !== "tab")
      );

      const result = await getAttemptAnswers(attempt_id, { ...query });

      setAnswers(result.data);
      setPagination(result.pagination);
    } catch (error) {
      toast({
        title: "Oops! Sesuatu telah terjadi",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }

  async function onSubmitData(data: AssessmentSchema) {
    try {
      const result = await postAttemptAssessments(data, attempt_id);

      toast({
        description: result.messages[0],
      });
      fetchData();
    } catch (error) {
      toast({
        title: "Oops! Sesuatu telah terjadi",
        description: (error as Error).message.toString(),
        variant: "destructive",
      });
    }
  }

  return (
    <Layout variant="admin">
      {data ? (
        <div className="rounded-md border h-full w-full p-4 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2 space-y-1">
              <p className="text-3xl tracking-widest font-bold">
                {data.patient.name ? data.patient.name : "Anonim"}
              </p>
              <p className="text-sm text-foreground font-light">
                {data.patient.email}
              </p>
              <Badge variant="default" className="capitalize">
                {data.status}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-lg">AI Accuracy</p>
                <p>{data.ai_accuracy}</p>
              </div>
              <div>
                <p className="font-semibold text-lg">AI Probability</p>
                <p>{data.ai_probability}</p>
              </div>
              <div className="col-span-2">
                <p className="font-semibold text-lg">AI Diagnosis</p>
                <p>{data.ai_diagnosis ? data.ai_diagnosis : "-"}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <p className="font-semibold text-lg">Diagnosis:</p>
            <p className="col-span-4 border-b">{data.diagnosis}</p>
            <p className="font-semibold text-lg">Feedback:</p>
            <p className="col-span-4 border-b">{data.feedback}</p>
          </div>
        </div>
      ) : null}
      {checkRole ? (
        <div className="w-full flex justify-end">
          <Button
            data-testid="btn-add-data"
            onClick={() => setShowDialog(true)}
            disabled={data?.status === "done"}
            aria-disabled={data?.status === "done"}
          >
            Tambah Asesmen
          </Button>
        </div>
      ) : null}
      <DataTable
        columns={columns}
        data={answers}
        noFoundMessage="Tidak ada data tersedia"
        manualPagination={true}
      />
      <ModalAttempt
        open={showDialog}
        onOpenChange={setShowDialog}
        onSubmit={(data) => onSubmitData(data)}
      />
      <Pagination meta={pagination} />
    </Layout>
  );
};

export default DetailAttempt;
