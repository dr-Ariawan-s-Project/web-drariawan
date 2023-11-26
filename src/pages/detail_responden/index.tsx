import  { useEffect, useState } from 'react';

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

const DetailResponden = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dapatkan attempt_id dari URL parameter
        const attemptId = window.location.pathname.split('/').pop();

        // Simulasikan panggilan API untuk mendapatkan data berdasarkan attemptId
        const response = await fetch(`https://drariawan.altapro.online/v1/questioner/attempts/${attemptId}/answers`);
        const data = await response.json();

        setAnswers(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching answer data:', error);
      }
    };

    fetchData();
  }, []); // Pastikan untuk menyertakan dependensi yang diperlukan

  const renderAnswer = (answer: Answer) => {
    switch (answer?.question?.type) {
      case 'choices':
        return answer?.choices?.map((choice: { label: any; }) => choice.label).join(', ');
      case 'text':
        return answer?.description;
      default:
        return 'Tidak ada jawaban';
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Jawaban Responden</h2>
          <ul>
            {answers.map((answer) => (
              <li key={answer.id}>
                <strong>{answer?.question?.question}</strong>: {renderAnswer(answer)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DetailResponden;
