import { Request, response, Response } from 'express';
import { getWordsDB } from '../services/getWords';

export const getWords = async (request: Request, response: Response) => {
  try {
    console.log('heelo');
    const numberWords = Number(request.query.option);
    const words = await getWordsDB(numberWords);
    console.log('words from db', words);
    response.status(201).send(words);
  } catch (err) {
    console.error(err);
    response.status(501).json(err);
  }
};
