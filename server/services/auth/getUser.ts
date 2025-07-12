import db from '../../config/db-connection';
import bcrypt from 'bcrypt';
import { get_secret_key } from '../../config/get-environment-variables';

import { create_token } from '../../utils/createToken';

export const getUser = async (
  user_name: string,
  password: string
): Promise<string> => {
  try {
    const sql = `SELECT user_name, password, email
        FROM users WHERE user_name = ($1)`;
    const db_user = await db.one(sql, [user_name]);

    const isValidPassword = await bcrypt.compare(password, db_user.password);
    if (!isValidPassword) {
      throw new Error('incorrect password');
    }

    const secret_key = get_secret_key();
    const token = await create_token(db_user, secret_key);

    return token;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
