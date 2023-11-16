import { useNavigate } from 'react-router-dom';
import { SetStateAction, useEffect, useState } from 'react';
import { useQuestionaire } from '../../store/apiQuestionaire';
import Cookies from 'js-cookie';


interface TableRowProps {
  index: number;
  item: any;
  formatDate: (dateString: any) => string;
  handleViewDetail: (item: any) => void;
}

const TableRow: React.FC<TableRowProps> = ({ index, item, formatDate, handleViewDetail }) => {
  return (
    <tr key={item.id} className="mb-2 border-b text-center">
      <td className="text-center p-2">{index + 1}</td>
      <td className="p-2">{item.patient ? item.patient.email : 'N/A'}</td>
      <td className="p-2">{formatDate(item.created_at)}</td>
      <td className="text-center p-2"><a role="button" onClick={() => handleViewDetail(item)} className="text-blue-500 hover:underline">View</a></td>
      <td className="p-2">
        <button type="button" className="px-2 mr-2 bg-emerald-300 text-green-900 p-2 rounded text-sm leading-none flex items-center ml-4">Approved</button>
      </td>
    </tr>
  );
};
  

const Responden = () => {
  const { data: attemptsData, loading, error: attemptsError, getAttempts } = useQuestionaire();
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  const navigate = useNavigate();
  const userRole = Cookies.get('userRole');
  const token = Cookies.get('token');

  const [page, setPage] = useState<number>(1);
  const [startNumber, setStartNumber] = useState<number>(1);

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

  const formatDate = (dateString: any) => {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear().toString(); 
    return `${day}/${month}/${year}`;
  };

  const handleViewDetail = (item: any) => {
    if (item && item.id) {
      const attemptId = item.id;
      Cookies.set('attempts_id', attemptId);
      console.log('Attempts ID:', attemptId);
      navigate(`/admin/detail_responden/${item.id}`, {
        state: { attempt_id: attemptId }
      });
    } else {
      console.error('Error handling view detail: Invalid item data.');
    }
  };
  
  const handleNextPage = () => {
    const token = Cookies.get('token');
    const userRole = Cookies.get('userRole');
    const nextPage = page + 1;
  
    if (token && userRole) {
      setPage(nextPage);
      getAttempts(nextPage, 10, token, userRole);
    } else {
      console.error('Token or User Role is undefined.');
    }
  };  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token || !userRole || !['admin', 'dokter', 'suster'].includes(userRole)) {
          console.log(
            'Akses anda ditolak. Anda tidak memiliki akses ke halaman ini.'
          );        
        } else {
          await getAttempts(page, 10, token, userRole);
          setStartNumber((page - 1) * 10);
        }
      } catch (error) {
        console.error('Error fetching attempts data:', error);
      }
    };
  
    fetchData();
  }, [getAttempts, page, token, userRole]);
  

  return (
    <div className="overflow-x-auto mx-auto w-full mt-2 sm:mt-20 flex-grow text-center">
      <div className="relative bg-white px-10 py-4">
        <div className="relative overflow-x-auto overflow-y-scroll pr-10 ">
          {loading ? (
            <p>Loading...</p>
          ) : attemptsError ? (
            <p>Error: {attemptsError}</p>
          ) : (
            <table className="w-full table-auto bg-white">
              <thead className="text-health-blue-dark font-lato_regular">
                <tr>
                  <th className="px-5" onClick={() => handleSortChange('id')}>
                    No
                  </th>
                  <th onClick={() => handleSortChange('email')} >
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
                  <TableRow
                    key={item.id}
                    index={index + startNumber}
                    item={item}
                    formatDate={formatDate}
                    handleViewDetail={handleViewDetail}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center mt-10 gap-5">
        <button
          className="w-full md:w-32 h-10 bg-health-blue-dark border-none hover:bg-health-blue-reguler focus:outline-none rounded-md text-white font-semibold flex items-center justify-center"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <div className="w-full md:w-32 mt-3 md:mt-0">
          <input
            className="w-full h-10 p-3 rounded-sm border border-health-blue-dark text-center"
            type="number"
            value={page}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPage(parseInt(e.target.value))
            }
          />
        </div>
        <button
          className="w-full md:w-32 h-10 bg-health-blue-dark border-none hover:bg-health-blue-reguler focus:outline-none rounded-md text-white font-semibold flex items-center justify-center"
          onClick={handleNextPage}
          disabled={!attemptsData?.data || attemptsData.data.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Responden;
