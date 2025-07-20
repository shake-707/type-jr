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

export const sendTestResult = async (results: resultApiData) => {
    try {
        await axios.post('/api/postTestResult', results);
    } catch (err) {
        console.error(err);
    }
  
};
