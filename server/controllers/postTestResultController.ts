import { Request, Response } from 'express';
import { insertTestResult } from '../services/insertTestResult';

export type resultClientData = {
  wpm: number;
  accurary: number;
  correctCharacters: number;
  incorrectCharacters: number;
  correctWords: number;
  incorrectWords: number;
  testLabel: string;
  user_name: string;
};

export const postTestResult = async (request: Request, response: Response) => {
  try {
    const resultData: resultClientData = request.body;

    await insertTestResult(resultData);
    response.status(201).send('test result insert successful');
  } catch (err) {
    console.error(err);
    response.status(500).send(`error with insert ${err}`);
  }
};
