type letterState = 'correct' | 'incorrect' | 'unchecked';

export const handleInput = (
  e: KeyboardEvent,
  letterState: letterState[][],
  stateTestWords: string[],
  stateWordIndex: number,
  stateLetterIndex: number,
  extraChars: string[]
) => {
  const key = e.key;
  let wordIndex = stateWordIndex;
  let charIndex = stateLetterIndex;
  const testWords = stateTestWords;
  let changeLetterState = letterState;
  let extras = extraChars;
  const nonCharacters = [
    'Shift',
    'Control',
    'Alt',
    'Meta',
    'CapsLock',
    'Tab',
    'Enter',
    'Escape',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
  ];

  const isCharacter = key.length === 1 && !nonCharacters.includes(key);
  const isSpace = key === ' ';
  const isBackSpace = key === 'Backspace';

  const expectedChar = testWords[wordIndex]?.[charIndex];

  // skip to next word
  if (isSpace) {
    changeLetterState = changeLetterState.map((wordState, wIndex) =>
      wordIndex === wIndex
        ? wordState.map((charState) =>
            charState === 'unchecked' ? 'incorrect' : charState
          )
        : wordState
    );

    wordIndex += 1;
    charIndex = 0;
    return { wordIndex, charIndex, changeLetterState, extras };
  }

  if (isBackSpace) {
    if ((extraChars[wordIndex] ?? '').length > 0) {
      extras = extras.map((xString, xIndex) =>
        xIndex === wordIndex ? xString.slice(0, xString.length - 1) : xString
      );
      return { wordIndex, charIndex, changeLetterState, extras };
    }

    if (wordIndex === 0 && charIndex === 0) {
      return { wordIndex, charIndex, changeLetterState, extras };
    }

    if (charIndex === 0) {
      wordIndex -= 1;
      charIndex = testWords[wordIndex].length - 1;
    } else {
      charIndex -= 1;
    }

    changeLetterState = changeLetterState.map((wordState, wIndex) =>
      wIndex === wordIndex
        ? wordState.map((charState, cIndex) =>
            cIndex === charIndex ? 'unchecked' : charState
          )
        : wordState
    );
    return { wordIndex, charIndex, changeLetterState, extras };
  }

  if (isCharacter) {
    if (charIndex >= testWords[wordIndex].length) {
      extras = extras.map((extraStr, extraIndex) =>
        extraIndex === wordIndex ? extraStr + key : extraStr
      );
      return { wordIndex, charIndex, changeLetterState, extras };
    }

    changeLetterState = changeLetterState.map((wordArray, wIndex) =>
      wIndex === wordIndex
        ? wordArray.map((state, cIndex) =>
            cIndex === charIndex
              ? key === expectedChar
                ? 'correct'
                : 'incorrect'
              : state
          )
        : wordArray
    );
    charIndex += 1;
    return { wordIndex, charIndex, changeLetterState, extras };
  }

  return { wordIndex, charIndex, changeLetterState, extras };
};
