type letterState = 'correct' | 'incorrect' | 'unchecked';

export const handleInput = (
  e: KeyboardEvent,
  letterState: letterState[][],
  stateTestWords: string[],
  stateWordIndex: number,
  stateLetterIndex: number
) => {
  const key = e.key;
  let wordIndex = stateWordIndex;
  let charIndex = stateLetterIndex;
  const testWords = stateTestWords;
  let changeLetterState = letterState;

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
    return { wordIndex, charIndex, changeLetterState };
  }

  if (isBackSpace) {
    if (wordIndex === 0 && charIndex === 0)
      return { wordIndex, charIndex, changeLetterState };

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
  }

  if (isCharacter) {
    if (charIndex >= testWords[wordIndex].length) {
      return { wordIndex, charIndex, changeLetterState };
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
  }

  return { wordIndex, charIndex, changeLetterState };
};
