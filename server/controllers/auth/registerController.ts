import { Request, Response } from 'express';
import { insertUser } from '../../services/auth/insertUser';
export const handleRegister = async (request: Request, response: Response) => {
  try {
    const { user_name, email, password } = request.body;
    if (
      typeof user_name !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string'
    ) {
      response.status(400).json({ error: 'all fields must be strings' });
      return
    }
    if (password.length < 7) {
      response.status(400).json({ error: 'password too short' });
      return;
    }

    if (!email.includes('@')) {
      response.status(400).json({ error: 'Invalid email' });
      return
    }
    const newUser = await insertUser(user_name, email, password);
    response.status(201).json(newUser);
    return;
  } catch (error) {
    console.error('error registering', error);
    response.status(501).send(error);
  }
};
