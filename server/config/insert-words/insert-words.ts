// import db from '../../db/connection';
import fs from 'fs';
import path from 'path';

import db from '../db-connection';

export const insertWords = async () => {
  try {
    const { count } = await db.one('SELECT COUNT(*) FROM words');

    if (parseInt(count) === 0) {
      const filePath = path.resolve(__dirname, 'words.txt');
      const data = fs.readFileSync(filePath, 'utf-8');
      if (!data) {
        throw new Error('failed to read data in file');
      }
      const words = data
        .split(',')
        .map((word) => word.trim())
        .filter((word) => word.length > 0);

      for (const word of words) {
        const sql = `INSERT INTO words (word) VALUES ($1)`;
        await db.none(sql, [word]);
      }

      console.log(`Inserted ${words.length} words into database`);
    } else {
      console.log('Words table already populated');
    }
  } catch (error) {
    console.error('Error inserted words into db', error);
  }
};
