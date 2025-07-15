import { WordContainer } from './wordContainer';
import { getWords } from '../../services/fetchWords';
import { useEffect, useState, useRef } from 'react';

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
        console.log('words from api', words);
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
      console.log('words from state', wordsApi);
      setLetterStates(initiallizeLetterState);
      console.log('my initialized state', letterStates);
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
    console.log('my letter state:', letterStates);

    const handleKeyUp = (e: KeyboardEvent) => {
      console.log('previous word length: ', prevWordLength);
      const key = e.key;

      const expectedValue = wordsApi[currentWordIndex]?.[currentLetterIndex];
      console.log('expectedValue: ', expectedValue);
      console.log('key pressed: ', key);

      setLetterStates((prev) =>
        prev.map((wordStateArr, wordIdx) =>
          wordIdx === currentWordIndex
            ? wordStateArr.map((letterState, letterIdx) =>
                letterIdx === currentLetterIndex
                  ? expectedValue === key
                    ? 'correct'
                    : 'incorrect'
                  : letterState
              )
            : wordStateArr
        )
      );

      if (e.key === ' ') {
        e.preventDefault();
        setPrevWordLength((prev) => wordsApi[currentWordIndex]?.length || 0);
        setCurrentWordIndex((prev) => prev + 1);
        setCurrentLetterIndex((prev) => prev - prev);
      } else if (e.key === 'Backspace') {
        if (currentLetterIndex === 0 && currentWordIndex === 0) {
          console.log('inside top condition');
          setCurrentWordIndex((prev) => prev);
          setCurrentLetterIndex((prev) => prev);
          return;
        }
        console.log('current letter index', currentLetterIndex);
        console.log('current word index', currentWordIndex);
        if (currentLetterIndex === 0) {
          console.log('prev word length before: ', prevWordLength);
          setPrevWordLength(
            (prev) => (prev = wordsApi[currentWordIndex - 1]?.length || 0)
          );
          const prevv = wordsApi[currentWordIndex - 1].length;
          console.log('prevvy: ', prevv);
          console.log('prev word length after', prevWordLength);
          setCurrentWordIndex((prev) => prev - 1);
          setCurrentLetterIndex((prev) => prevv - 1);
        } else {
          setCurrentLetterIndex((prev) => prev - 1);
        }

        console.log('key press', e.key);
      } else {
        console.log('key press', e.key);
        if (currentLetterIndex + 1 === wordsApi[currentWordIndex].length) {
          console.log('end of word');
          return;
        }
        setCurrentLetterIndex((prev) => prev + 1);
        console.log('current letter index: ', currentLetterIndex);
        console.log('current word index: ', currentWordIndex);
      }
    };

    window.addEventListener('keydown', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyUp);
    };
  }, [letterStates, currentLetterIndex, currentWordIndex]);

  // useEffect(() => {
  //   containerRef.current?.focus();
  // });

  //const wordsFromDb: string[] = ['Hello', 'World'];
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
