import { Request, Response } from 'express';
import { insertUser } from '../../services/auth/insertUser';
export const handleRegister = async (request: Request, response: Response) => {
  try {
    const { user_name, email, password } = request.body;
    const newUser = await insertUser(user_name, email, password);
    response.status(201).json(newUser);
    return;
  } catch (error) {
    console.error('error registering', error);
    throw error;
  }
};
