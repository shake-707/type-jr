import { useEffect, useState } from 'react';
import { getUserTestResults } from '../../services/fetchUserTestResults';

type Props = {
  user_name: string;
};

type testResultsProp = {
  wpm: number;
  accuracy: number;
  label: string;
};

export const UserTestResults = ({ user_name }: Props) => {
  const [testResults, setTestResults] = useState<testResultsProp[] | null>(null);

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const response = await getUserTestResults(user_name);
        setTestResults(response);
      } catch (err) {
        console.error('Error fetching test results:', err);
      }
    };

    if (user_name) {
      fetchTestResults();
    }
  }, [user_name]);

  return (
    <div className='text-sage-gray'>
        <h3>Previous Results</h3>
      {testResults?.map((result, index) => (
        <div key={index} className="p-2 border-b">
          <div>WPM: {result.wpm}</div>
          <div>Accuracy: {result.accuracy}</div>
          <div>Test Type: {result.label}</div>
        </div>
      ))}
      {!testResults && <div>Loading test results...</div>}
    </div>
  );
};