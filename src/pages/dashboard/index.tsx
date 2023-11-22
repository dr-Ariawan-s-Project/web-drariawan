import Cookies from 'js-cookie';
import InformationCard from '../../components/InformationCard';
import ListAppoinment from '../../components/ListAppoinment';
import ListResponden from '../../components/ListResponden';
import { useDashboard } from '../../store/apiDashboard';
import { useAuth } from '../../store/apiAuth';  
import { useEffect } from 'react';

const Dashboard = () => {
  const token = Cookies.get('token');
  const { data, error, getDashboard } = useDashboard();
  const { data: authData, error: authError } = useAuth();
  const userRole = authData?.role;

  useEffect(() => {
    if (token) {
      getDashboard(token);
    }
  }, [getDashboard, token]);

  if (authError || error) {
    return <p>Error: {authError || error}</p>;
  }
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
      {( userRole === 'admin' || userRole === 'dokter' || userRole === 'suster') && (
          <div className="md:w-1/2">
            <ListResponden />
          </div>
        )}
  {( userRole === 'admin' || userRole === 'dokter' || userRole === 'suster') && (
          <div className="md:w-1/2">
            <ListAppoinment />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;