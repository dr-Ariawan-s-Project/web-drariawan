import Cookies from 'js-cookie';
import InformationCard from '../../components/InformationCard';
import { useEffect } from 'react';

import { useDashboard } from '../../store/apiDashboard';
import BarChart from '../../components/BarChart';

const Dashboard = () => {
  const token = Cookies.get('token');
  const { data, getDashboard, getChartData, error } = useDashboard();
  const userRole = Cookies.get('userRole');
  useEffect(() => {
    if (token) {
      getDashboard(token);
      getChartData(token);
    }
  }, [getChartData, getDashboard, token]);
  if (error) {
    return <p>Error: {error}</p>;
  }
  console.log("data:", data);
  console.log("userRole:", userRole);

  return (
    <div className="mt-20">
      <div className="flex ">
        <div className="flex flex-wrap -mx-3">
          <InformationCard
            title="Semua Pertanyaan"
            value={data.questioner_all}
            gradientColors="from-blue-500 to-violet-500"
            iconClass="solar:chart-bold"
          />

          <InformationCard
            title="Pertanyaan yang perlu di Asessmen"
            value={data.questioner_need_assess}
            gradientColors="from-red-600 to-orange-600"
            iconClass="ic:baseline-medical-services"
          />

          <InformationCard
            title="Pertanyaan Baru bulan ini"
            value={data.questioner_this_month}
            gradientColors="from-emerald-500 to-teal-400"
            iconClass="ic:baseline-border-color"
          />

          <InformationCard
            title="Patient baru bulan ini"
            value={data.questioner_this_month}
            gradientColors="from-orange-500 to-yellow-500"
            iconClass="healthicons:default"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {(userRole === 'admin' || userRole === 'dokter' || userRole === 'suster') && (
          <div className="md:w-1/2">
            <BarChart data={data.chartData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


