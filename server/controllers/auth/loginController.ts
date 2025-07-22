import { Request, Response } from 'express';
import { getUser } from '../../services/auth/getUser';
export const handleLogin = async (request: Request, response: Response) => {
  try {
    const { user_name, password } = request.body;
    if (password.length < 7) {
      response.status(400).json({error: 'password too short'});
      return;
    }
    const user = await getUser(user_name, password);
    response.status(201).send(user);
  } catch (err) {
    response.status(500).json({ message: 'Login failed', error: err });
  }
};
