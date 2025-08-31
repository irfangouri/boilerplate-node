import cors from 'cors';
import express from 'express';
import dbConnection from './config/database';
import { errorHandler } from './middlewares/errorHandler';
import router from './routes';

dbConnection();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);
app.use('/api/v1', router);

app.get('/health', (req, res) => {
  res.send('ok');
});

export default app;
