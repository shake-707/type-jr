import { WordContainer } from './wordContainer';
import { getWords } from '../../services/fetchWords';
import { useEffect, useState } from 'react';
export const TestBox = () => {
  const [wordsApi, setWordsApi] = useState<string[]>([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const words = await getWords();
        setWordsApi(words);
        console.log('words from api', words);
      } catch (err) {
        console.error('error fetching words ', err);
      }
    };

    fetchWords();
  }, []);

  //const wordsFromDb: string[] = ['Hello', 'World'];
  return (
    <div>
      <WordContainer words={wordsApi} />
    </div>
  );
};
