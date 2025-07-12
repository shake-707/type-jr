import { Request, Response } from 'express';
import { getUser } from '../../services/auth/getUser';
export const handleLogin = async (request: Request, response: Response) => {
  try {
    const { user_name, password } = request.body;
    const user = await getUser(user_name, password);
    response.status(201).send(user);
  } catch (err) {
    response.status(500).json({ message: 'Login failed', error: err });
  }
};
