type resultdataProp = {
  resultsData: {
    wpm: number;
    accurary: number;
    correctCharacters: number;
    incorrectCharacters: number;
    correctWords: number;
    incorrectWords: number;
    testLabel: string;
  };
};

export const ResultsScreen = ({resultsData}: resultdataProp) => {
  return (
    <div className="text-white">
      <div>
        <span>Results</span>
        <span>exit</span>
      </div>
      <div>{resultsData.testLabel}</div>
      <div>
        <div>
          <span>{resultsData.wpm}wpm</span>
        </div>
        <div>
          <div>
            <span>
              {resultsData.correctWords}/
              {resultsData.correctWords + resultsData.incorrectWords}
            </span>
          </div>
          <div>
            <span>correct words/total words</span>
          </div>
        </div>
      </div>
      <div>
        <div>
          <span>{resultsData.accurary}% acc</span>
        </div>
        <div>
          <div>
            <span>
              {resultsData.correctCharacters}/
              {resultsData.correctCharacters + resultsData.incorrectCharacters}
            </span>
          </div>
          <div>
            <span>correct characters/incorrect characters</span>
          </div>
        </div>
      </div>
    </div>
  );
};
