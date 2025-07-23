import db from '../config/db-connection';


export const getWordsDB = async (wordAmount : number): Promise<string []> => {
  try {
    const sql = `SELECT word 
  FROM words 
  ORDER BY RANDOM() 
  LIMIT $1`;

    const count = wordAmount
    const words = await db.many<{word: string}>(sql, [count]);
    console.log(words);
    return words.map(words => words.word);
  } catch (err) {
    console.error('error getting words from db', err);
    throw err;
  }
};
