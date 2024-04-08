import express, { Router, Request, Response } from 'express';
// import Config from './src/config/config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const ConnectDB = async () => {
  const MongoURI = `${process.env.DATABASE}`;
  try {
    await mongoose.connect(MongoURI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    throw err;
  }
};

const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const RouterApi = Router();

app.use(express.urlencoded({ limit: '30000kb', extended: true }));
app.use(express.json({ limit: '30000kb' }));

app.use(require('express-fileupload')());

app.use(cors());

app.use('/api', RouterApi);

(async () => {
  try {
    await ConnectDB();

    RouterApi.get('/', (req: Request, res: Response) => {
      res.send('Hello World!');
    });
    RouterApi.use('/user', require('./src/routes/user'));
    RouterApi.use('*', (req: Request, res: Response) => {
      res.status(404).send('404 Not Found');
    });

    app.listen(port, () => {
      console.log(`[server_ok] ⚡️ Running at port ${port}`);
    });
  } catch (error) {
    console.log(`[server_error] Initialization error:`);
    console.log(error);
  }
})();
