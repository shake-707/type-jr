import db from '../config/db-connection';

type dbTestCategoriesData = {
  id: number;
  text_mode: string;
  time_seconds: number | null;
  word_count: number| null;
  quote_length: string | null;
  label: string;
};

export const getTestCategories = async (): Promise<dbTestCategoriesData[]> => {
  try {
    const sql = `
        SELECT * 
        FROM test_categories`;

    const categories = await db.many(sql);
    return categories;
  } catch (err) {
    console.error('could get test categories data from db', err);
    throw err;
  }
};
