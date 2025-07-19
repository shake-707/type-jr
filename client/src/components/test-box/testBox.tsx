import { WordContainer } from './wordContainer';
import { getWords } from '../../services/fetchWords';
import { useEffect, useState, useRef } from 'react';
import { handleInput } from '../../utils/handleKeyInputs';
import { fetchTestCategories } from '../../services/fetchTestCategories';
import { TypeTestNavbar } from '../typing-test-navbar/TypingTestNavbar';
import { calculateTestResults } from '../../utils/handleTestResults';
import { ResultsScreen } from './ResultScreen';
import { incrementLines } from '../../utils/incrementTextLine';

type letterState = 'correct' | 'incorrect' | 'unchecked';
type categories = 'count' | 'time';
type gameState = 'start game' | 'in progress' | 'ended';

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
  // what is needed before game start
  const [wordsApi, setWordsApi] = useState<string[]>([]);
  const [testCategories, setTestCategories] = useState<categorySet[]>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [timeStart, setTimeState] = useState<number>(30);
  const [defaultWordCount, setDefaultWordCount] = useState<number>(25);

  //  -- when switching category during test reset needed
  const [category, setCategory] = useState<categories>('time');

  // what i need to reset when restart or new game
  const [gameState, setGameState] = useState<gameState>('start game');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [letterStates, setLetterStates] = useState<letterState[][]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(timeStart);
  const [wordCount, setWordCount] = useState<number>(0);
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

  // callback function from test nav bar to sets test options
  const handleOptionSelect = (
    category: categories,
    option: { length: number; label: string }
  ) => {
    if (category === 'count') {
      setCategory('count');
      setDefaultWordCount(option.length);
      setResultsLabel(option.label);
    } else if (category === 'time') {
      setCategory('time');
      setTimeLeft(option.length);
      setResultsLabel(option.label);
    }
    resetGameState(option.length);
    setGameState('start game');
    containerRef.current?.focus();
  };

  const resetGameState = (newTime?: number) => {
    if (wordsApi.length > 0) {
      const initiallizeLetterState = wordsApi.map((word) => {
        return Array(word.length).fill('unchecked');
      });
      const initiallizeExtraCharState = Array(wordsApi.length).fill('');

      // reseting words container tops
      const container = document.getElementById('words-container');
      const wordTopDiv = document.querySelector<HTMLDivElement>('.current');

      if (container && wordTopDiv) {
        container.style.marginTop = '0px';
        wordTopDiv.style.marginTop = '0px';
      }

      setCurrentLetterIndex(0);
      setCurrentWordIndex(0);
      setLetterStates(initiallizeLetterState);
      setExtraChar(initiallizeExtraCharState);
      setTimeLeft(newTime || timeStart);
      setWordCount(0);
      setGameState('start game');
    }
  };

  // getting words and test categories from backend
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

  // inititalizing both char and extra char states for the test
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

  // for incrementing text line as typing
  useEffect(() => {
    const currentWordDiv = document.querySelector<HTMLDivElement>('.current');
    const wordsContainerDiv =
      document.querySelector<HTMLDivElement>('#words-container');
    if (!currentWordDiv || !containerRef.current || !wordsContainerDiv) return;

    incrementLines(currentWordDiv, wordsContainerDiv, containerRef.current);
  }, [currentWordIndex]);

  //  starts test and also calculates resuls on end of test
  useEffect(() => {
    let shouldEnd = false;
    if (category === 'time') {
      shouldEnd = timeLeft <= 0;
    } else if (category === 'count') {
      //console.log('insidee  this check', defaultWordCount);
      shouldEnd = wordCount >= defaultWordCount;
    }
    if (shouldEnd && gameState === 'in progress') {
      const finalLetterState = letterStates;
      //console.log('final letter state', finalLetterState);
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
      setGameState('ended');

    }
    if (gameState === 'start game' || gameState === 'ended' || shouldEnd)
      return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, timeLeft]);

  // handle key inputs and checks if correct/incorrect input
  useEffect(() => {
    if (wordsApi.length === 0) return;
    if (gameState === 'ended') return;

    const handleKeyUp = (e: KeyboardEvent) => {
      if (gameState === 'start game') {
        setGameState('in progress');
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
  }, [
    letterStates,
    currentLetterIndex,
    currentWordIndex,
    extraChar,
    gameState,
  ]);

  // useEffect(() => {
  //   console.log('⏱️ timeStart changed:', timeStart);
  // }, [timeStart]);

  // useEffect(() => {
  //   console.log('🔤 defaultWordCount changed:', defaultWordCount);
  // }, [defaultWordCount]);

  // useEffect(() => {
  //   console.log('📦 wordsApi changed:', wordsApi);
  // }, [wordsApi]);

  // useEffect(() => {
  //   console.log('🎮 gameState changed:', gameState);
  // }, [gameState]);

  // useEffect(() => {
  //   console.log('⌨️ currentWordIndex changed:', currentWordIndex);
  // }, [currentWordIndex]);

  // useEffect(() => {
  //   console.log('🔡 currentLetterIndex changed:', currentLetterIndex);
  // }, [currentLetterIndex]);

  // useEffect(() => {
  //   console.log('🧩 letterStates changed:', letterStates);
  // }, [letterStates]);

  // useEffect(() => {
  //   console.log('⏳ timeLeft changed:', timeLeft);
  // }, [timeLeft]);

  // useEffect(() => {
  //   console.log('📈 wordCount changed:', wordCount);
  // }, [wordCount]);

  // useEffect(() => {
  //   console.log('⌨️ isTyping changed:', isTyping);
  // }, [isTyping]);

  // useEffect(() => {
  //   console.log('🏁 gameEnd changed:', gameEnd);
  // }, [gameEnd]);

  // useEffect(() => {
  //   console.log('📊 results changed:', results);
  // }, [results]);

  // useEffect(() => {
  //   console.log('🏷️ resultsLabel changed:', resultsLabel);
  // }, [resultsLabel]);

  // useEffect(() => {
  //   console.log('✏️ extraChar changed:', extraChar);
  // }, [extraChar]);

  // useEffect(() => {
  //   console.log('📂 testCategories changed:', testCategories);
  // }, [testCategories]);

  // useEffect(() => {
  //   console.log('📘 category changed:', category);
  // }, [category]);

  return (
    <div>
      <div
        ref={containerRef}
        tabIndex={0}
        className={` p-4 h-[200px] w-[85vw] mx-auto outline-none transition-all duration-200`}
      >
        {testCategories && (
          <TypeTestNavbar
            categories={testCategories}
            onOptionSelect={handleOptionSelect}
          />
        )}
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
      <div>
        {gameState === 'ended' && <ResultsScreen resultsData={results} />}
      </div>
    </div>
  );
};
