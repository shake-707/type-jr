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
        <div className="relative flex items-center justify-end w-full">
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <span>Results</span>
          </div>
          <div className="mr-2">
            <span
              className="text-incorrect-red cursor-pointer hover:underline"
              onClick={onExit}
            >
              exit
            </span>
          </div>
        </div>
        <div className="flex justify-center">{resultsData.testLabel}</div>
        <div className="flex justify-between items-start w-full mb-[40px]">
          <div className="inline-block ml-4">
            <span className="text-5xl mr-1">{resultsData.wpm}</span><span>wpm</span>
          </div>
          <div className="text-right mr-3">
            <div className="inline-block">
              <span className="text-4xl">
                {resultsData.correctWords}/
                {resultsData.correctWords + resultsData.incorrectWords}
              </span>
            </div>
            <div className="mr-4">
              <span>words</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-start w-full">
          <div className="inline-block ml-4">
            <span className="text-5xl">{resultsData.accurary}</span><span>% acc</span>
          </div>
          <div className="text-right mr-3">
            <div className="inline-block text-4xl">
              <span>
                {resultsData.correctCharacters}/
                {resultsData.correctCharacters +
                  resultsData.incorrectCharacters}
              </span>
            </div>
            <div>
              <span>characters</span>
            </div>
          </div>
        </div>
      </div>
  
  );
};
