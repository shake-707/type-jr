type letterState = 'correct' | 'incorrect' | 'unchecked';

type wordProp = {
  wordInput: string;
  isCurrent: boolean;
  currentLetterIndex: number;
  letterState: letterState[];
  extraCharacters: string;
};

export const Word = ({
  wordInput,
  isCurrent,
  currentLetterIndex,
  letterState,
  extraCharacters,
}: wordProp) => {
  const hasExtras = (extraCharacters ?? '').length > 0;
  const endOfWord = currentLetterIndex >= wordInput.length;
  return (
    <div className={`inline-block mr-1 ${isCurrent ? 'current' : ''}`}>
      {wordInput.split('').map((char, charIndex) => {
        const isCursor = isCurrent && charIndex === currentLetterIndex;
        const state = letterState?.[charIndex] ?? 'unchecked';

        let spanClass = 'mr-[2px] ';

        if (isCursor) spanClass += ' border-l-2 border-white ';

        switch (state) {
          case 'correct':
            spanClass += ' text-bright-gray ';
            break;
          case 'incorrect':
            spanClass += ' text-incorrect-red ';
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
      {!hasExtras && isCurrent && endOfWord && (
        <span key="-1" className="border-r-2 border-white"></span>
      )}

      {hasExtras &&
        extraCharacters.split('').map((xChar, xIndex) => {
          const isCursor = xIndex === extraCharacters.length - 1;
          let spanClass = 'mr-[2px] text-incorrect-red ';
          if (isCursor && isCurrent) {
            spanClass += 'border-r-2 border-white';
          }

          return (
            <span key={`extra-${xIndex}`} className={spanClass}>
              {xChar}
            </span>
          );
        })}
    </div>
  );
};
