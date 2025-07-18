type letterState = 'correct' | 'incorrect' | 'unchecked';

export const calculateTestResults = (
  finalState: letterState[][],
  timeLength: number
) => {
  let correctCharacters = 0;
  let incorrectCharacters = 0;
  let correctWords = 0;
  let incorrectWords = 0;

  // if wordstate contains unchecked means that is last word user is on check
  // all words before
  for (const wordState of finalState) {
    if (wordState.includes('unchecked')) {
      break;
    }

    for (const char of wordState) {
      if (char === 'correct') correctCharacters++;
      if (char === 'incorrect') incorrectCharacters++;
    }

    if (wordState.includes('incorrect')) {
      incorrectWords++;
    } else {
      correctWords++;
    }
  }
  return {
    correctCharacters,
    incorrectCharacters,
    correctWords,
    incorrectWords,
    wpm: Math.round(correctWords / (timeLength / 60)),
    accuracy: Math.round(
      (correctCharacters / (correctCharacters + incorrectCharacters)) * 100 || 0
    ),
  };
};
