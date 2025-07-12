import db from '../../config/db-connection';
import bcrypt from 'bcrypt';

type User = {
  user_id: number;
  user_name: string;
  email: string;
};

export const insertUser = async (
  user_name: string,
  email: string,
  password: string
): Promise<User> => {
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

  const hashedPassword = await bcrypt.hash(password, 10);
  const now = new Date();

  const values = [user_name, hashedPassword, now, email];

  try {
    const { id } = await db.one(sql, values);
  
    console.log(`users id: ${id}`);
    return { user_id: id, user_name, email };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
