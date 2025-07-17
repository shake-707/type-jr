import { WordContainer } from './wordContainer';
import { getWords } from '../../services/fetchWords';
import { useEffect, useState, useRef } from 'react';
import { handleInput } from '../../utils/handleKeyInputs';
import { fetchTestCategories } from '../../services/fetchTestCategories';
import { TypeTestNavbar } from '../typing-test-navbar/typing-test-navbar';

type letterState = 'correct' | 'incorrect' | 'unchecked';

type categories = 'count' | 'time';

type categorySet = {
  category: categories;
  options: {
    length: number;
    label: string;
  }[];
};


export const TestBox = () => {
  const [wordsApi, setWordsApi] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [letterStates, setLetterStates] = useState<letterState[][]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [wordCount, setWordCount] = useState<number>(0);
  const [defaultWordCount, setDefaultWordCount] = useState<number>(25);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleOptionSelect = (
    category: categories,
    option: { length: number; label: string }
  ) => {
    if (category === 'count') {
      setDefaultWordCount(option.length);
    } else if (category === 'time') {
      setTimeLeft(option.length);
    }
  };
  const [testCategories, setTestCategories] = useState<categorySet[]>();

  useEffect(() => {
    if (!isTyping || timeLeft <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isTyping, timeLeft]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const words = await getWords();
        setWordsApi(words);
      } catch (err) {
        console.error('error fetching words ', err);
      }
    };

    const fetchCategores = async () => {
      try {
        const categories = await fetchTestCategories();
        setTestCategories(categories);
        console.log(categories);
      } catch (err) {
        alert('error');
        console.error('error fetching categories', err);
      }
    };

    fetchWords();
    fetchCategores();
  }, []);

  useEffect(() => {
    if (wordsApi.length > 0) {
      const initiallizeLetterState = wordsApi.map((word) => {
        return Array(word.length).fill('unchecked');
      });
      setLetterStates(initiallizeLetterState);
    }
  }, [wordsApi]);

  useEffect(() => {
    if (wordsApi.length === 0) return;

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!isTyping) {
        setIsTyping(true);
      }

      const inputHandler = handleInput(
        e,
        letterStates,
        wordsApi,
        currentWordIndex,
        currentLetterIndex
      );
      setCurrentLetterIndex(inputHandler.charIndex);
      setCurrentWordIndex(inputHandler.wordIndex);
      setLetterStates(inputHandler.changeLetterState);
      setWordCount(inputHandler.wordIndex);
    };

    window.addEventListener('keydown', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyUp);
    };
  }, [letterStates, currentLetterIndex, currentWordIndex, isTyping]);

  return (
    <div>
      {testCategories && (
        <TypeTestNavbar
          categories={testCategories}
          onOptionSelect={handleOptionSelect}
        />
      )}
      <div
        ref={containerRef}
        tabIndex={0}
        className={` p-4 h-[200px] w-[85vw] mx-auto outline-none transition-all duration-200`}
      >
        <div className="w-[30px] text-white">
          {wordCount}/{defaultWordCount}
        </div>
        <div className="w-[30px] text-white">{timeLeft}</div>
        <WordContainer
          words={wordsApi}
          wordIndex={currentWordIndex}
          letterIndex={currentLetterIndex}
          letterStates={letterStates}
        />
      </div>
    </div>
  );
};
