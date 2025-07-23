import db from '../config/db-connection';
import type { resultClientData } from '../controllers/postTestResultController';

export const insertTestResult = async ({
  wpm,
  accurary,
  incorrectCharacters,
  correctCharacters,
  incorrectWords,
  correctWords,
  testLabel,
  user_name,
}: resultClientData): Promise<void> => {
  try {
    const sql = `INSERT INTO 
    test_results (user_id, 
    total_words_typed,
    correct_words_typed,
    total_chars_typed,
    correct_chars_typed,
    test_mode,
    wpm,
    accuracy)
    VALUES (
    (SELECT id FROM users WHERE user_name = $1),
    $2, $3,$4,$5,
    (SELECT id FROM test_categories WHERE label = $6),
    $7,$8 
    )`;
    //console.log('label: ', testLabel);

    const values = [
      user_name,
      correctWords + incorrectWords,
      correctWords,
      correctCharacters + incorrectCharacters,
      correctCharacters,
      testLabel,
      wpm,
      accurary,
    ];
    await db.query(sql, values);
  } catch (err) {
    console.error('Error inserting test result', err);
    throw err;
  }
};
