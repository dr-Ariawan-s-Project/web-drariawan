import React, { SetStateAction, useEffect, useState } from 'react';
import { useQuestionaire } from '../../store/apiQuestionaire';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import Tooltip from '../../components/Tooltip';

interface Answer {
  choices: any;
  id: string;
  attempt_id: string;
  question_id: number;
  description: string;
  score: number;
  created_at: string;
  updated_at: string;
  question: {
    id: number;
    type: string;
    question: string;
    description: string;
    url_video: string;
    section: string;
    choices: any[];
    goto: any; 
  };
}

interface TableRowProps {
  index: number;
  item: any;
  formatDate: (dateString: string) => string;
  handleViewDetail: (attemptId: string, userEmail: string, userId: string) => void;
}


interface AnswerDetailProps {
  answers: Answer[];
  attemptId: string;
  userId: string; 
}


const AnswerDetail: React.FC<AnswerDetailProps> = ({ answers, userId }) => {
  const userEmail = Cookies.get('email') || 'N/A';

  if (!Array.isArray(answers) || answers.length === 0) {
    console.error('Invalid answer data:', answers);
    return <p>Tidak ada jawaban.</p>;
  }

  return (
    <div>
      <div className="overflow-x-auto mx-auto w-full mt-2">
        <div className="relative overflow-x-auto h-[60vh] overflow-y-scroll">
          <table className="w-full table-auto bg-white py-10 mb-10">
            <thead className="text-health-blue-dark font-lato_regular bg-gray-200">
              <tr>
                <th className="px-5 py-3">Patient ID</th>
                <th className="px-5">Email</th>
              </tr>
            </thead>
            <tbody>
                  <tr >
                    <td className="border-b p-3 text-center">{userId}</td>
                    <td className="border-b p-3 text-center">{userEmail}</td>
                  </tr>
            </tbody>
          </table>
          <table className="w-full table-auto bg-white py-10">
            <thead className="text-health-blue-dark font-lato_regular bg-gray-200">
              <tr>
                <th className="px-5 py-3">Question_id</th>
                <th className="px-5">Type</th>
                <th className="px-5">Section</th>
                <th className="px-5">Question</th>
                <th className="px-5">Answer</th>
                <th className="px-5">Score</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(answers) && answers.length > 0 ? (
                answers.map((answer: Answer) => (
                  <tr key={answer.id}>
                    <td className="border-b p-3 text-center">{answer.question.id}</td>
                    <td className="border-b p-3 text-center">{answer.question.type}</td>
                    <td className="border-b p-3 text-center">{answer.question.section}</td>
                    <td className="border-b p-3 text-left">{answer.question.question}</td>
                    <td className="border-b p-3 text-center">{answer.question.description}</td>
                    <td className="border-b p-3 text-center">{answer.score}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    No answer data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


const TableRow: React.FC<TableRowProps> = ({ index, item, formatDate, handleViewDetail }) => {
  const userRole = Cookies.get('userRole');

  return (
    <tr key={item.id} className="mb-2 border-b text-center">
      <td className="text-center p-2">{index + 1}</td>
      <td className="p-2">{item.patient ? item.patient.email : 'N/A'}</td>
      <td className="p-2">{formatDate(item.created_at)}</td>
      <td className="p-2">{item.diagnosis}</td>
      <td className="p-2">{item.feedback}</td>
      <td className="text-center p-2">
        {userRole !== 'admin' ? (
          <Tooltip
            content="Unauthorized access to view Respondent details!"
            position="left"
          >
            <span className="text-gray-500 cursor-not-allowed">View</span>
          </Tooltip>
        ) : (
          <a
            role="button"
            onClick={() => handleViewDetail(item.id, item.patient?.email || 'N/A', item.patient?.id || 'N/A')}
            className="text-blue-500 hover:underline"
          >
            View
          </a>
        )}
      </td>
      <td className="p-2">
        <button
          type="button"
          className={`px-2 mr-2 p-2 rounded text-sm leading-none flex items-center ml-4 ${
            item.status && item.status.toLowerCase() === 'approved' ? 'bg-emerald-300 text-green-900' :
            item.status === 'Retake' ? 'bg-blue-300 text-blue-900' :
            'bg-yellow-300 text-red-900'
          }`}
        >
          {item.status || 'Waiting'}
        </button>
      </td>
    </tr>
  );
};

const Responden = () => {
  const { data: attemptsData, loading, error: attemptsError, getAttempts } = useQuestionaire();
  const [userId, setUserId] = useState<string>('');

  const [sortBy, setSortBy] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  const userRole = Cookies.get('userRole');
  const token = Cookies.get('token');

  const [page, setPage] = useState<number>(1);
  const [startNumber, setStartNumber] = useState<number>(1);
  const [selectedAttempt, setSelectedAttempt] = useState<{ attemptId: string; answers: Answer[] } | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);

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
  const handleBack = () => {
    setShowAnswers(false); 
    setSelectedAttempt(null); 
  };
  const sortedData = sortData(attemptsData?.data || []);

  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };

  const handleViewDetail = async (attemptId: string, userEmail: string, userId: string) => {
    try {
      if (!token || !userRole || userRole !== 'admin') {
        console.error('Access denied: Invalid token or user role.');
        return;
      }
  
      const attemptResponse = await axios.get(
        `https://drariawan.altapro.online/v1/questioner/attempts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log('Attempt Response:', attemptResponse.data);
  
      if (attemptResponse.status !== 200) {
        console.error(`Error fetching attempt details. Status: ${attemptResponse.status}`);
        return;
      }
  
      const answersResponse = await axios.get(
        `https://drariawan.altapro.online/v1/questioner/attempts/${attemptId}/answers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log('Answers Response:', answersResponse.data);
  
      if (answersResponse.status !== 200) {
        console.error(`Error fetching answers. Status: ${answersResponse.status}`);
        return;
      }
  
      const answers = answersResponse.data.data;
      Cookies.set('current_attempt_id', attemptId);
      Cookies.set('id', userId);
      Cookies.set('email', userEmail);
  
      console.log(userId)
      setSelectedAttempt((prevSelectedAttempt) => ({
        ...prevSelectedAttempt,
        attemptId,
        answers,
        userId, 
        email: userEmail,
      }));

      setUserId(userId); 
      setShowAnswers(true);
    } catch (error: any) {
      console.error('Error:', error.message || error);
    }
  };
  
  
  const handleNextPage = () => {
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
          console.log('Access denied. You do not have access to this page.');
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
            <div>
        {showAnswers ? (
            <div className="flex flex-col items-start">
              <button onClick={handleBack} className="bg-white flex items-center text-health-blue-reguler font-lato_regular mb-4">
                <Icon icon="ep:back" color="#004878" className="mr-2" /> Back
              </button>
              <div className="ml-auto">
                <Link to="/admin/assessment" className="bg-white flex items-center text-health-blue-reguler font-lato_regular mb-4">
                  <Icon icon="material-symbols-light:add-notes-outline-rounded" color="#004878" className="mr-2" width={24} /> Add Assessment
                </Link>
              </div>
              <AnswerDetail
                answers={selectedAttempt?.answers || []}
                attemptId={selectedAttempt?.attemptId || ''}
                userId={userId}
                />         
              </div>
          ) : (
                <div>
                  <table className="w-full table-auto bg-white">
                <thead className="text-health-blue-dark font-lato_regular">
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
                        <span className="ml-2" title={sortDirection === 'asc' ? 'Sort from Newest' : 'Sort from Oldest'}>
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </th>
                    <th className="px-5">Detail</th>
                    <th>Diagnosis</th>
                    <th>Feedback</th>
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
                      handleViewDetail={(attemptId: string, userEmail: string, userId: string) =>
                        handleViewDetail(attemptId, userEmail, userId)
                      }
                    />
                  ))}

                    </tbody>
                  </table>
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPage(parseInt(e.target.value))}
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
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Responden;