import { Request, Response } from 'express';
import { getUser } from '../../services/auth/getUser';

export type User = {
  user_name: string;
  password: string;
};

export const handleLogin = async (request: Request, response: Response) => {
  try {
    const user: User = request.body;
    if (user.password.length < 7) {
      response.status(400).json({ error: 'password too short' });
      return;
    }
    const userTokenInfo = await getUser(user);
    response.status(201).send(userTokenInfo);
  } catch (err) {
    response.status(500).json({ message: 'Login failed', error: err });
  }
};
