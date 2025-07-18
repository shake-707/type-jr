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
    <div className="h-[90px] w-[85vw] leading-[30px] min-[320px] : overflow-hidden mx-auto">
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
  );
};
