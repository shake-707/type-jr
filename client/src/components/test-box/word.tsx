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
  return (
    <div className={`inline-block mr-1 ${isCurrent ? 'current' : ''}`}>
      {wordInput.split('').map((char, charIndex) => {
        const isCursor = isCurrent && charIndex === currentLetterIndex;
        const state = letterState?.[charIndex] ?? 'unchecked';
        const finalCharIndex = wordInput.length - 1 === charIndex;

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
      {isCurrent && extraCharacters.length === 0 && wordInput.length <= currentLetterIndex && (
        <span
          key={extraCharacters.length - 1}
          className="border-r-2 border-white"
        ></span>
      )}

      {isCurrent && extraCharacters !== '' && (
        <>
          {extraCharacters.split('').map((xChar, xIndex) => {
            const isCursor = xIndex === extraCharacters.length - 1;
            let spanClass = 'mr-[2px] text-red-400 ';
            if (isCursor) {
              spanClass += 'border-r-2 border-white';
            }

            return (
              <span key={`extra-${xIndex}`} className={spanClass}>
                {xChar}
              </span>
            );
          })}
        </>
      )}
    </div>
  );
};
