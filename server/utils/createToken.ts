import jwt from 'jsonwebtoken';

export const create_token = async (db_user: any, secret_key: string): Promise<string> => {
  try {
    const token = jwt.sign(db_user, secret_key);
    return token
  } catch (err) {
    console.error(err);
    throw err;
  }
};
