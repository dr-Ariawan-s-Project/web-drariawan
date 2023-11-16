import { useLocation } from 'react-router-dom';
import { useQuestionaire } from '../../store/apiQuestionaire';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const DetailResponden = () => {
  const userRole = Cookies.get('userRole');
  const token = Cookies.get('token');
  const location = useLocation();
  const { getAnswers } = useQuestionaire() as any;

  const [answers, setAnswers] = useState<any>({}); 

  useEffect(() => {
    const attemptId = location.state?.attempt_id; 

    const fetchAnswers = async () => {
      try {
        if (!token || !userRole) {
          console.log('Akses Ditolak.');
          return;
        }
        if (userRole === 'dokter') {
          console.log('Anda tidak memiliki akses ke halaman ini.');
          return;
        }

        const fetchedAnswers = await getAnswers(attemptId, token);
        setAnswers(fetchedAnswers);
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    };

    fetchAnswers();
  }, [getAnswers, location.state?.attempt_id, token, userRole]);

  return (
    <div className="overflow-x-auto mx-auto w-full mt-2 sm:mt-20 flex-grow text-start">
      <div className="relative bg-white shadow-lg rounded-2xl px-10 py-4">
        <h1 className="py-10 font-lato-bold">Detail Responden</h1>
        <div className="relative overflow-x-auto overflow-y-scroll pr-10">
          <table className="w-full table-auto text-sm">
            <thead className="border-b font-medium border-neutral-300">
              <tr>
                <th>AI Accuracy</th>
                <th>AI Probability</th>
                <th>AI Diagnosis</th>
                <th>Diagnosis</th>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{answers?.ai_accuracy}</td>
                <td>{answers?.ai_probability}</td>
                <td>{answers?.ai_diagnosis}</td>
                <td>{answers?.diagnosis}</td>
                <td>{answers?.id}</td>
                <td>{answers?.name}</td>
                <td>{answers?.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailResponden;
