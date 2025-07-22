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
  onExit: () => void;
};

export const ResultsScreen = ({ resultsData, onExit }: resultdataProp) => {
  return (
    
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-50 text-sage-gray bg-dark-gray mx-auto  w-[500px] h-[300px] rounded-md">
        <div className="flex">
          <div className="inline-block">
            <span>Results</span>
          </div>
          <div className="w-[30px] inline-block ml-auto">
            <span
              className="text-red-400 cursor-pointer hover:underline"
              onClick={onExit}
            >
              exit
            </span>
          </div>
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
                {resultsData.correctCharacters +
                  resultsData.incorrectCharacters}
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
