import { Response, Request } from 'express';
import { selectTestResults } from '../services/selectTestResults';

export const getTestResults = async (request: Request, response: Response) => {
  try {
    const user_name = request.query.user_name as string;
    console.log('user name from request',user_name);
    const testResults = await selectTestResults(user_name);
    console.log(testResults);
    response.status(201).json(testResults);
  } catch (err) {
    console.error(err);
    response.status(501).send(err);
  }
};
