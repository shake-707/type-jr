import axios from 'axios';

type resultApiData = {
  wpm: number;
  accurary: number;
  correctCharacters: number;
  incorrectCharacters: number;
  correctWords: number;
  incorrectWords: number;
  testLabel: string;
  user_name: string;
};

export const sendTestResult = async (results: resultApiData): Promise<void> => {
    try {
        await axios.post<resultApiData>('/api/postTestResult', results);
    } catch (err) {
        console.error(err);
    }
  
};
