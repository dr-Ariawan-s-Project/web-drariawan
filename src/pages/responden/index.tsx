import { useNavigate } from 'react-router-dom';
import { SetStateAction, useEffect, useState } from 'react';
import { useQuestionaire } from '../../store/apiQuestionaire';
import Cookies from 'js-cookie';
import { useAuth } from '../../store/apiAuth';

// import { Answer } from '../../utils/data'; 

const Responden = () => {
  const { data: attemptsData, loading, error: attemptsError, getAttempts } = useQuestionaire();
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  const navigate = useNavigate();
  const { data: authData } = useAuth();
  const userRole = authData?.role;
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token || !userRole || !['admin', 'dokter', 'suster'].includes(userRole)) {
          console.log('Access denied. You do not have permission to access this page.');
        } else {
          await getAttempts(token, userRole);
        }
      } catch (error) {
        console.error('Error fetching attempts data:', error);
      }
    };

    fetchData();
  }, [getAttempts, token, userRole]);

  const handleSortChange = (field: SetStateAction<string>) => {
    if (field === sortBy) {
      setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const sortData = (data: any[]) => {
    return data.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    });
  };

  const sortedData = sortData(attemptsData?.data || []);

  const formatDateString = (dateString: any) => {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear().toString().slice(-2); 
    return `${day}/${month}/${year}`;
  };

  const handleViewDetail = (item: any) => {
    let dataToSend; 
    if (item && item.id) {
      const attemptId = item.id;
  
      dataToSend = {
        ai_accuracy: item.ai_accuracy,
        ai_probability: item.ai_probability,
        ai_diagnosis: item.ai_diagnosis,
        diagnosis: item.diagnosis,
        id: item.patient.id,
        name: item.patient.name,
        email: item.patient.email,
      };
  
      console.log(dataToSend); 
      navigate(`/admin/detail_responden/${item.id}`, {
        state: { attempt_id: attemptId, ...dataToSend }
      });
    } else {
      console.error('Error handling view detail: Invalid item data.');
    }
  };
  
  
  
  
  return (
    <div className="overflow-x-auto mx-auto w-full mt-2 sm:mt-20 flex-grow text-start">
      <div className="relative bg-white shadow-lg rounded-2xl px-10 py-4">
        <h1 className="py-10 font-lato-bold">List Responden</h1>
        <div className="relative overflow-x-auto overflow-y-scroll pr-10 ">
          {loading ? (
            <p>Loading...</p>
          ) : attemptsError ? (
            <p>Error: {attemptsError}</p>
          ) : (
            <table className="w-full table-auto text-sm ">
              <thead className="border-b font-medium border-neutral-300">
                <tr>
                  <th className="px-5" onClick={() => handleSortChange('id')}>
                    No
                  </th>
                  <th onClick={() => handleSortChange('email')}>
                    Email
                    {sortBy === 'email' && (
                      <span className="pl-2">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th className="px-5" onClick={() => handleSortChange('created_at')}>
                    Date 
                    {sortBy === 'created_at' && (
                      <span className="ml-2" title={sortDirection === 'asc' ? 'Urutkan dari Terbaru' : 'Urutkan dari Terlama'}>
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th className="px-5">Detail</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((item: any, index: number) => (
                  <tr key={item.id} className="mb-2">
                    <td className="text-center">{index + 1}</td>
                    <td>{item.patient ? item.patient.email : 'N/A'}</td>
                    <td>{formatDateString(item.created_at)}</td>
                    <td className="text-center">
                      <a
                        role="button"
                        onClick={() => handleViewDetail(item)}
                        className="text-blue-500 hover:underline"
                      >
                        View
                      </a>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="px-2 mr-2 bg-emerald-300 text-green-900 p-2 rounded text-sm leading-none flex items-center ml-4"
                      >
                        Approved
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Responden;
