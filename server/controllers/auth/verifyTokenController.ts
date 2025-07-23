import { Request, Response } from 'express';
import { verifyJWT } from '../../utils/jwtHelper';

export const verifyToken = async (request: Request, response: Response) => {
  try {
    response.set('Cache-Control', 'no-store');
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      response.status(401).send('no token given');
      return;
    }

    const token = authHeader.split(' ')[1];

    const decodeToken = verifyJWT(token);

    response.status(200).send(decodeToken);
  } catch (error) {
    response.status(401).json({ valid: false, messsage: 'Invalid token' });
  }
};
