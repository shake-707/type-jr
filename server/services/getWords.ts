import db from '../config/db-connection';

type wordsDb = {
    words: string[];
}

export const getWordsDB = async (wordAmount : number) => {
  try {
    const sql = `SELECT word 
  FROM words 
  ORDER BY RANDOM() 
  LIMIT $1`;
  
    const count = wordAmount
    const words = await db.many(sql, [count]);
    return words;
  } catch (err) {
    console.error('error getting words from db', err);
  }
};
