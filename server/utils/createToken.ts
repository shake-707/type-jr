import jwt from 'jsonwebtoken';
import { newUser } from '../controllers/auth/registerController';

export type tokenData = {
  user_name: string;
  email: string;
};

export const create_token = async (
  db_user: newUser,
  secret_key: string
): Promise<string> => {
  try {
    const payload: tokenData = {
      user_name: db_user.user_name,
      email: db_user.email,
    };
    const token = jwt.sign(payload, secret_key, {expiresIn: '4h'});
    return token;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
