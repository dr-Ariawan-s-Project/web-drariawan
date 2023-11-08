import { SetStateAction, useEffect, useState } from 'react';
import { useQuestionaire } from '../store/apiQuestionaire';
import { Link } from 'react-router-dom';

const ListResponden = () => {
  const { data, loading, error, getAttempts } = useQuestionaire();
  const [sortBy, setSortBy] = useState('created_at'); 
  const [sortDirection, setSortDirection] = useState('desc'); 

  useEffect(() => {
    getAttempts();
  }, [getAttempts]);

  const handleSortChange = (field: SetStateAction<string>) => {
    if (field === sortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
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

  const sortedData = sortData(data?.data || []);

  const formatDateString = (dateString:any) => {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear().toString().slice(-2); 
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="overflow-x-auto mx-auto w-full mt-2 sm:mt-20 flex-grow text-start">
      <div className="relative bg-white shadow-lg rounded-2xl px-10 py-4">
        <h1 className="py-10 font-lato-bold">Newest Respondents</h1>
        <div className="relative overflow-x-auto overflow-y-scroll pr-10 ">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
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
  </tr>
</thead>
              <tbody>
                {sortedData.map((item: any, index: number) => (
                  <tr key={item.id} className="mb-2">
                    <td className="text-center">{index + 1}</td>
                    <td>{item.patient ? item.patient.email : 'N/A'}</td>
                    <td>{formatDateString(item.created_at)}</td>
                    <td className="text-center">
  <Link to={`detail_responden/:attempt_id`}>View</Link>
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

export default ListResponden;
