import { Request, Response } from 'express';
import { insertUser } from '../../services/auth/insertUser';
export type newUser = {
  user_name: string;
  email: string;
  password: string;
};

export const handleRegister = async (request: Request, response: Response) => {
  try {
    const user: newUser = request.body;

    if (user.password.length < 7) {
      response.status(400).send({ error: 'password too short' });
      return;
    }

    if (!user.email.includes('@')) {
      response.status(400).send({ error: 'Invalid email' });
      return;
    }
    const newUser = await insertUser(user);
    response.status(201).send(newUser);
    return;
  } catch (err) {
    console.error('error registering', err);
    response.status(501).send({ message: 'registration failed', error: err });
  }
};
