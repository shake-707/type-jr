import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Response, Request } from 'express';

dotenv.config();
import morgan from 'morgan';
import apiRouter from './routes';
import { insertWords } from './config/insert-words/insert-words';

const PORT = process.env.PORT || 5002;
const app = express();

async function startServer() {
  app.use(morgan('dev'));
  app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
  }));
  app.use(express.json());
  app.use(cookieParser());
  
  app.use('/api', apiRouter);
  insertWords();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();
