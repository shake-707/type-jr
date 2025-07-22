import db from '../config/db-connection';

export const selectTestResults = async (user_name: string) => {
  try {
    const sql = `
        SELECT tr.*, tc.label as label
        FROM test_results tr
        JOIN test_categories tc ON tr.test_mode = tc.id
        WHERE tr.user_id = (
        SELECT id FROM users WHERE user_name = $1
        )
        ORDER BY tr.id ASC`;

    const testResults = await db.any(sql, [user_name]);
    return testResults;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
