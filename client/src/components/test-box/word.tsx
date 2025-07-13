type wordProp = {
    wordInput: string
   
}

export const Word = ({wordInput}: wordProp) => {
  return (
    <div className="inline-block mr-1" >
      {wordInput.split('').map((char, index) => (
        <span className="text-sage-gray" key={index}>{char}</span>
      ))}
    </div>
  );
};
