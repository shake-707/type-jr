import jwt from 'jsonwebtoken';

export const verifyJWT = (token: string) => {
  return jwt.verify(token, process.env.SECRET_KEY!);
};
