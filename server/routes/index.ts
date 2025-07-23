import express from 'express';



import { handleLogin } from '../controllers/auth/loginController';
import { handleRegister } from '../controllers/auth/registerController';
import { verifyToken } from '../controllers/auth/verifyTokenController';
import { getWords } from '../controllers/getWordsController';
import { testCategoriesConttroller } from '../controllers/getTestCategories';
import { postTestResult } from '../controllers/postTestResultController';
import { getTestResults } from '../controllers/getTestResultsController';
const apiRouter = express.Router();


apiRouter.post('/register', handleRegister);
apiRouter.post('/login', handleLogin);
apiRouter.get('/verify-token', verifyToken);
apiRouter.get('/getWords', getWords);
apiRouter.get('/test-categories', testCategoriesConttroller);
apiRouter.post('/postTestResult', postTestResult)
apiRouter.get('/testResults',getTestResults);

export default apiRouter;
