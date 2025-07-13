import db from '../config/db-connection';

type wordsDb = {
    words: string[];
}

export const getWordsDB = async () => {
  try {
    const sql = `SELECT word 
  FROM words 
  ORDER BY RANDOM() 
  LIMIT 50`;

    const words = await db.many(sql);
    return words;
  } catch (err) {
    console.error('error getting words from db', err);
  }
};
