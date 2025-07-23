import jwt from 'jsonwebtoken';
import type { tokenData } from './createToken';

export const verifyJWT = (token: string): tokenData=> {
  return jwt.verify(token, process.env.SECRET_KEY!) as tokenData;
};
