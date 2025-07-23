import db from '../../config/db-connection';
import bcrypt from 'bcrypt';
import type { newUser } from '../../controllers/auth/registerController';


export const insertUser = async (
  user:newUser
): Promise<newUser> => {
  const sql = `
    INSERT INTO users (
        user_name,
        password,
        created_at,
        email
    )
        values( $1, $2, $3, $4)
        RETURNING id, user_name;
    `;

  const hashedPassword = await bcrypt.hash(user.password, 10);
  const now = new Date();

  const values = [user.user_name, hashedPassword, now, user.email];

  try {
    await db.one(sql, values);
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
