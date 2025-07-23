import db from '../config/db-connection';

export type testResultsData = {
    total_words_typed: number,
    correct_words_typed: number,
    total_chars_typed: number,
    correct_chars_typed: number,
    wpm: number,
    accuracy:number,
    label: string
}

export const selectTestResults = async (user_name: string): Promise<testResultsData[]> => {
  try {

    const sql = `
      SELECT 
        tr.total_words_typed,
        tr.correct_words_typed,
        tr.total_chars_typed,
        tr.correct_chars_typed,
        tr.wpm,
        tr.accuracy,
        tc.label
      FROM test_results tr
      JOIN test_categories tc ON tr.test_mode = tc.id
      WHERE tr.user_id = (
        SELECT id FROM users WHERE user_name = $1
      )
      ORDER BY tr.id DESC
    `;

    const testResults = await db.any<testResultsData>(sql, [user_name]);
    return testResults;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
