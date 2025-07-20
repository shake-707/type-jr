import { Request, Response } from 'express';
import { insertTestResult } from '../services/insertTestResult';
type resultdata = {
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
    const {
      wpm,
      accurary,
      correctCharacters,
      incorrectCharacters,
      correctWords,
      incorrectWords,
      testLabel,
      user_name,
    }: resultdata = request.body;

    await insertTestResult(
      wpm,
      accurary,
      incorrectCharacters,
      correctCharacters,
      incorrectWords,
      correctWords,
      testLabel,
      user_name
    );
    response.status(201).send('test result insert successful');
  } catch (err) {
    console.error(err);
    response.status(500).send(`error with insert ${err}`);
  }
};
