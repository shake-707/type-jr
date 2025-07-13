import { Word } from './word';
type wordContainer = {
  words: string[];
};

export const WordContainer = ({ words }: wordContainer) => {
  return (
    <div className='h-[90px] w-[85vw] leading-[30px] min-[320px] : overflow-hidden mx-auto'>
      {words.map((word, index) => (
        <Word key={index} wordInput={word}  />
      ))}
    </div>
  );
};
