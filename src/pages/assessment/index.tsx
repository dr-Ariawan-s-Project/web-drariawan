import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useSwalCreate } from '../../utils/swal/useSwalData';
import { useQuestionaire } from '../../store/apiQuestionaire';


const Assessment = () => {
  const userRole = Cookies.get('userRole');
  const token = Cookies.get('token');
  const {  getAttempts } = useQuestionaire();

  const [newAssessment, setNewAssessment] = useState({
    diagnosis : '',
    feedback: '',
    status: '' 
    
  });


  const handleAddAssessment = async (assessment: {
    diagnosis: string;
    feedback: string;
    status: string;
  }) => {
    try {  
      const attemptId = Cookies.get('current_attempt_id');
  
      const response = await axios.post(
        `https://drariawan.altapro.online/v1/questioner/attempts/${attemptId}/assesments`,
        assessment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
  
      if (response.data && response.data.messages && response.data.messages.includes('[success] add assesment')) {
        useSwalCreate('success');
        window.history.back();
      } else {
        useSwalCreate('failed', 'Failed to add assessment.');
      }
    
    } catch (error: any) {
      console.error('Failed to update data: ', error);
  
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
  
      useSwalCreate('failed', error.message);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token || !userRole || !['admin', 'dokter', 'suster'].includes(userRole)) {
          console.log('Access denied. You do not have access to this page.');
        } else {
          await getAttempts(1, 10, token, userRole);
        }
      } catch (error) {
        console.error('Error fetching attempts data:', error);
      }
    };

    fetchData();
  }, [getAttempts, token, userRole]);

  return (
    <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-health-blue-reguler">
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <div className="grid max-w-2xl mx-auto mt-8">
              <div className="items-center mt-8 sm:mt-14 text-health-blue-reguler">
                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <label className="block mb-2 text-sm  font-lato_bold text-indigo-900 dark:text-white">
                    Diagnosis
                    </label>
                   <input
                      type="text"
                      id="diagnosis"
                      className=" font-lato_regular border border-indigo-300 text-health-blue-dark text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      placeholder="Diagnosis"
                      value={newAssessment?.diagnosis || ''}
                      required
                      onChange={(e) => setNewAssessment({ ...newAssessment, diagnosis: e.target.value })}
                      />
                  </div>

                </div>
                <div className="mb-2 sm:mb-6">
                  <label className="block mb-2 text-sm font-lato_bold text-indigo-900 dark:text-white">
                    Feedback
                  </label>
                  <input
                    type="text"
                    id="feedback"
                    className="font-lato_regular border border-indigo-300 text-health-blue-dark text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                    placeholder="Feedback"
                    value={newAssessment?.feedback || ''}
                    required
                    onChange={(e) => setNewAssessment({ ...newAssessment, feedback: e.target.value })}
                  />
                </div>
                <div className="mb-2 sm:mb-6">
                  <label htmlFor="status" className="block mb-2 text-sm font-lato_bold text-indigo-900 dark:text-white">
                    Status
                  </label>
                  <select
                    id="status"
                    className="font-lato_regular border border-indigo-300 text-health-blue-dark text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                    value={newAssessment?.status || ''}
                    onChange={(e) => setNewAssessment({ ...newAssessment, status: e.target.value })}
                  >
                    <option value="Waiting">Waiting</option>
                    <option value="Approved">Approved</option>
                    <option value="Retake">Retake</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-4">     
                <button
                  onClick={() => {
                    console.log('Assessment:', newAssessment);
                    handleAddAssessment(newAssessment);
                  }}
                  type="button"
                  className="text-white bg-health-blue-medium hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >
                  Save
                </button>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Assessment;
