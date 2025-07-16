import { WordContainer } from './wordContainer';
import { getWords } from '../../services/fetchWords';
import { useEffect, useState, useRef } from 'react';
import { handleInput } from '../../utils/handleKeyInputs';

type letterState = 'correct' | 'incorrect' | 'unchecked';

export const TestBox = () => {
  const [wordsApi, setWordsApi] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [prevWordLength, setPrevWordLength] = useState(-1);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFocus, setFocus] = useState(false);
  const [letterStates, setLetterStates] = useState<letterState[][]>([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const words = await getWords();
        setWordsApi(words);
      } catch (err) {
        console.error('error fetching words ', err);
      }
    };

    fetchWords();
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
    const testBoxContainer = containerRef.current;
    if (!testBoxContainer) {
      console.log('couldnt get container');
      return;
    }

    const handleFocus = () => setFocus(true);
    const handdleBlur = () => setFocus(false);

    testBoxContainer.addEventListener('focus', handleFocus);
    testBoxContainer.addEventListener('blur', handdleBlur);

    return () => {
      testBoxContainer.removeEventListener('focus', handleFocus);
      testBoxContainer.removeEventListener('blur', handdleBlur);
    };
  }, [wordsApi]);

  useEffect(() => {
    if (wordsApi.length === 0) return;

    const handleKeyUp = (e: KeyboardEvent) => {
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
    };

    window.addEventListener('keydown', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyUp);
    };
  }, [letterStates, currentLetterIndex, currentWordIndex]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onClick={() => containerRef.current?.focus()}
      className={` p-4 h-[200px] w-[85vw] mx-auto outline-none transition-all duration-200 ${
        isFocus ? '' : 'blur-sm opacity-50'
      }`}
    >
      <WordContainer
        words={wordsApi}
        wordIndex={currentWordIndex}
        letterIndex={currentLetterIndex}
        letterStates={letterStates}
      />
    </div>
  );
};
