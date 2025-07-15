type letterState = 'correct' | 'incorrect' | 'unchecked';

type wordProp = {
  wordInput: string;
  isCurrent: boolean;
  currentLetterIndex: number;
  letterState: letterState[];
};

export const Word = ({
  wordInput,
  isCurrent,
  currentLetterIndex,
  letterState,
}: wordProp) => {
  return (
    <div className={`inline-block mr-1 ${isCurrent ? 'current' : ''}`}>
      {wordInput.split('').map((char, charIndex) => {
        const isCursor = isCurrent && charIndex === currentLetterIndex;
        const state = letterState?.[charIndex] ?? 'unchecked';

        let spanClass = 'mr-[2px] ';
        if (isCursor) spanClass += ' border-l-2 border-white ';
        switch (state) {
          case 'correct':
            spanClass += ' text-green-200 ';
            break;
          case 'incorrect':
            spanClass += ' text-red-400 ';
            break;
          case 'unchecked':
          default:
            spanClass += ' text-sage-gray ';
            break;
        }
        return (
          <span className={spanClass} key={charIndex}>
            {char}
          </span>
        );
      })}
    </div>
  );
};
