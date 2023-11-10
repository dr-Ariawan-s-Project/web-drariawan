import { useLocation  } from 'react-router-dom';

const DetailResponden = () => {
  const location = useLocation();
  const dataToSend = location.state;

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
                <td>{dataToSend.ai_accuracy}</td>
                <td>{dataToSend.ai_probability}</td>
                <td>{dataToSend.ai_diagnosis}</td>
                <td>{dataToSend.diagnosis}</td>
                <td>{dataToSend.id}</td>
                <td>{dataToSend.name}</td>
                <td>{dataToSend.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailResponden;
