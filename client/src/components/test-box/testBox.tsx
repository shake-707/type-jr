import { WordContainer } from './wordContainer';
import { getWords } from '../../services/fetchWords';
import { useEffect, useState, useRef } from 'react';
import { handleInput } from '../../utils/handleKeyInputs';
import { fetchTestCategories } from '../../services/fetchTestCategories';
import { TypeTestNavbar } from '../typing-test-navbar/typing-test-navbar';
import { calculateTestResults } from '../../utils/handleTestResults';
import { ResultsScreen } from './results-screen';
type letterState = 'correct' | 'incorrect' | 'unchecked';

type categories = 'count' | 'time';

type categorySet = {
  category: categories;
  options: {
    length: number;
    label: string;
  }[];
};

type resultdata = {
  wpm: number;
  accurary: number;
  correctCharacters: number;
  incorrectCharacters: number;
  correctWords: number;
  incorrectWords: number;
  testLabel: string;
};

export const TestBox = () => {
  const [wordsApi, setWordsApi] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [letterStates, setLetterStates] = useState<letterState[][]>([]);
  const [timeStart, setTimeState] = useState<number>(30);
  const [timeLeft, setTimeLeft] = useState<number>(timeStart);
  const [wordCount, setWordCount] = useState<number>(0);
  const [defaultWordCount, setDefaultWordCount] = useState<number>(25);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [category, setCategory] = useState<categories>('time');
  const [gameEnd, setGameEnd] = useState<boolean>(false);
  const [results, setResults] = useState<resultdata>({
    wpm: 0,
    accurary: 0,
    correctCharacters: 0,
    incorrectCharacters: 0,
    correctWords: 0,
    incorrectWords: 0,
    testLabel: '',
  });
  const [resultsLabel, setResultsLabel] = useState<string>('');
  const [extraChar, setExtraChar] = useState<string[]>(['']);

  // const resetTest = () => {
  //   setWordCount(0);
  //   setTimeLeft(timeStart);
  // };

  // useEffect(() => {
  //   setResults({
  //     wpm:
  //   })

  // },[gameEnd])

  const handleOptionSelect = (
    category: categories,
    option: { length: number; label: string }
  ) => {
    if (category === 'count') {
      setCategory('count');
      console.log('category', category);
      setDefaultWordCount(option.length);
      setResultsLabel(option.label);
    } else if (category === 'time') {
      setCategory('time');
      console.log('category', category);
      setTimeLeft(option.length);
      setResultsLabel(option.label);
    }
  };
  const [testCategories, setTestCategories] = useState<categorySet[]>();

  useEffect(() => {
    let shouldEnd = false;
    if (category === 'time') {
      shouldEnd = timeLeft <= 0;
    } else if (category === 'count') {
      shouldEnd = wordCount === defaultWordCount;
    }
    if (shouldEnd && !gameEnd) {
      const finalLetterState = letterStates;
      console.log('final letter state', finalLetterState);
      const {
        wpm,
        accuracy,
        correctCharacters,
        incorrectCharacters,
        correctWords,
        incorrectWords,
      } = calculateTestResults(
        finalLetterState,
        Math.abs(timeStart - timeLeft)
      );

      setResults({
        wpm: wpm,
        accurary: accuracy,
        correctCharacters: correctCharacters,
        incorrectCharacters: incorrectCharacters,
        correctWords: correctWords,
        incorrectWords: incorrectWords,
        testLabel: resultsLabel,
      });

      setGameEnd(true);
      setIsTyping(false);
      console.log(`wpm: ${wpm} and accuracy is ${accuracy}%`);
    }
    if (!isTyping || shouldEnd) return;

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
      const initiallizeExtraCharState = Array(wordsApi.length).fill('');
      setLetterStates(initiallizeLetterState);
      setExtraChar(initiallizeExtraCharState);
    }
  }, [wordsApi]);

  useEffect(() => {
    if (wordsApi.length === 0) return;
    if (timeLeft <= 0 && category === 'time') return;
    if (wordCount === defaultWordCount) return;

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!isTyping) {
        setIsTyping(true);
      }

      const inputHandler = handleInput(
        e,
        letterStates,
        wordsApi,
        currentWordIndex,
        currentLetterIndex,
        extraChar!
      );
      setCurrentLetterIndex(inputHandler.charIndex);
      setCurrentWordIndex(inputHandler.wordIndex);
      setLetterStates(inputHandler.changeLetterState);
      setWordCount(inputHandler.wordIndex);
      setExtraChar(inputHandler.extras);
    };

    window.addEventListener('keydown', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyUp);
    };
  }, [letterStates, currentLetterIndex, currentWordIndex, isTyping, extraChar]);

  useEffect(() => {
    console.log('extra keys', extraChar);
  }, [extraChar]);

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
        <div>
          {category === 'time' ? (
            <div className="w-[30px] text-white">{timeLeft}s</div>
          ) : (
            <div className="w-[30px] text-white">
              {wordCount}/{defaultWordCount}
            </div>
          )}
        </div>

        <WordContainer
          words={wordsApi}
          wordIndex={currentWordIndex}
          letterIndex={currentLetterIndex}
          letterStates={letterStates}
          extraCharacters={extraChar}
        />
      </div>
      <div>{gameEnd && <ResultsScreen resultsData={results} />}</div>
    </div>
  );
};
