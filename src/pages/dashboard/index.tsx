import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { useState, useEffect } from 'react';
import { startCase } from 'lodash';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { AdminLayout } from '@/components/layout';

import { getDashboardData, getChartData } from '@/utils/apis/dashboard/api';
import {
  IDashboardData,
  IQuestionnaireData,
} from '@/utils/apis/dashboard/types';

const Dashboard = () => {
  const { toast } = useToast();

  const [data, setData] = useState<IDashboardData>();
  const [charts, setCharts] = useState<IQuestionnaireData[]>([]);

  useEffect(() => {
    fetchData();
    fetchChartData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getDashboardData();

      setData(result.data);
    } catch (error) {
      toast({
        title: 'Oops! Sesuatu telah terjadi',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  const fetchChartData = async () => {
    try {
      const result = await getChartData();

      setCharts(result.data);
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data &&
          Object.keys(data).map((item) => (
            <Card key={item}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {startCase(
                    item.replace(
                      /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                      ' '
                    )
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data[item as keyof typeof data]}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Kuesioner per Bulan</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={charts}>
                <XAxis
                  dataKey="month"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="currentColor"
                  radius={[4, 4, 0, 0]}
                  className="fill-primary"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
