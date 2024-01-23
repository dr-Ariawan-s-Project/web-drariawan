import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { capitalize } from 'lodash';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import DataTable from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout';

import { getMySchedule } from '@/utils/apis/schedule/api';
import { getMyProfile } from '@/utils/apis/patient/api';
import { IMySchedule } from '@/utils/apis/schedule/types';

const PatientSchedule = () => {
  const { toast } = useToast();

  const [schedule, setSchedule] = useState<IMySchedule[]>([]);

  const columns: ColumnDef<IMySchedule>[] = [
    {
      accessorKey: 'booking_code',
      header: 'Booking Code',
    },
    {
      accessorKey: 'schedule.user.name',
      header: 'Nama Doktor',
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
      accessorKey: '',
      header: 'Jam',
      cell: (info) =>
        `${info.row.original.schedule.time_start} - ${info.row.original.schedule.time_end}`,
    },
    {
      accessorKey: 'schedule.health_care_address',
      header: 'Alamat Rumah Sakit',
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
  ];

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const result = await getMyProfile();
      getScheduleList(result.data.id);
    } catch (error) {
      toast({
        title: 'Oops! Sesuatu telah terjadi',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  const getScheduleList = async (id: string) => {
    try {
      const result = await getMySchedule(id);
      setSchedule(result.data);
    } catch (error) {
      toast({
        title: 'Oops! Sesuatu telah terjadi',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  return (
    <Layout className="p-5 space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>Daftar Jadwal Saya</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <DataTable
            columns={columns}
            data={schedule}
            noFoundMessage="Belum ada jadwal booking untuk bulan ini"
          />
        </CardContent>
      </Card>
    </Layout>
  );
};

export default PatientSchedule;
