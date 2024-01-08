import { useEffect, useState, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import { capitalize } from 'lodash';

import { useToast } from '@/components/ui/use-toast';
import DataTable from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout';
import Select from '@/components/select';

import { getMySchedule } from '@/utils/apis/schedule/api';
import { IMySchedule } from '@/utils/apis/schedule/types';
import { getMyProfile } from '@/utils/apis/auth/api';

const PatientSchedule = () => {
  const { toast } = useToast();

  const [schedule, setSchedule] = useState<IMySchedule[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

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

  const getMonthsFromSchedule = () => {
    const monthsSet = new Set<number>();
    schedule.forEach((item) => {
      const date = new Date(item?.booking_date);
      const monthIndex = date.getMonth();
      monthsSet.add(monthIndex);
    });

    const sortedMonths = Array.from(monthsSet).sort(
      (a: number, b: number) => b - a
    );
    const formattedMonths = sortedMonths.map((monthIndex) => {
      const date = new Date(2000, monthIndex);
      return date.toLocaleString('en-US', { month: 'long' });
    });

    return formattedMonths;
  };

  const getStatusOptions = () => {
    const statusSet = new Set<string>();
    schedule.forEach((item) => {
      statusSet.add(item.state);
    });
    return Array.from(statusSet);
  };

  const filteredSchedule = useMemo(() => {
    if (selectedMonth) {
      schedule.filter((item) => {
        const date = new Date(item?.booking_date);
        const formattedMonth = date
          .toLocaleString('en-US', { month: 'long' })
          .toLowerCase();
        return formattedMonth === selectedMonth.toLowerCase();
      });
    }

    return schedule;
  }, [schedule, selectedMonth]);

  return (
    <Layout className="p-5 space-y-5">
      <div className="text-center flex flex-col">
        <p className="font-semibold text-2xl">Daftar Jadwal Saya</p>
      </div>
      <div className="flex space-x-5 w-1/3">
        <Select
          label="Pilih Bulan"
          placeholder="Pilih Bulan"
          onValueChange={setSelectedMonth}
          options={getMonthsFromSchedule()}
        />
        <Select
          label="Pilih Status"
          placeholder="Pilih Status"
          onValueChange={setSelectedStatus}
          options={getStatusOptions()}
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredSchedule}
        noFoundMessage="Belum ada jadwal booking untuk bulan ini"
      />
    </Layout>
  );
};

export default PatientSchedule;
