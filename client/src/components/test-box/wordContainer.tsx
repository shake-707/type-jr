// import { Word } from './word';
import { Word } from './word';
type letterState = 'correct' | 'incorrect' | 'unchecked';

type wordContainerProps = {
  words: string[];
  wordIndex: number;
  letterIndex: number;
  letterStates: letterState[][];
  extraCharacters: string[];
};

export const WordContainer = ({
  words,
  wordIndex,
  letterIndex,
  letterStates,
  extraCharacters,
}: wordContainerProps) => {
  return (
    <div className="h-[90px] w-[85vw]  min-[320px]  overflow-hidden mx-auto">
      <div id="words-container" className="leading-[30px]">
        {' '}
        {words.map((word, index) => (
          <Word
            key={index}
            wordInput={word}
            isCurrent={wordIndex === index}
            currentLetterIndex={wordIndex === index ? letterIndex : -1}
            letterState={letterStates[index]}
            extraCharacters={extraCharacters[index]}
          />
        ))}
      </div>
    </div>
  );
};
