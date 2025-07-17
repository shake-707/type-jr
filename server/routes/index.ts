import express from 'express';

import { dbUsers } from './test';

import { handleLogin } from '../controllers/auth/loginController';
import { handleRegister } from '../controllers/auth/registerController';
import { verifyToken } from '../controllers/auth/verifyTokenController';
import { getWords } from '../controllers/getWordsController';
import { testCategoriesConttroller } from '../controllers/getTestCategories';
const apiRouter = express.Router();

apiRouter.get('/dbUsers', dbUsers);
apiRouter.post('/register', handleRegister);
apiRouter.post('/login', handleLogin);
apiRouter.get('/verify-token', verifyToken);
apiRouter.get('/getWords', getWords);
apiRouter.get('/test-categories', testCategoriesConttroller);

export default apiRouter;
