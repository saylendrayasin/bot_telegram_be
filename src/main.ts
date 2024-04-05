import express, { Router, Request, Response } from 'express';
import Config from './config/config';
import mongoose from 'mongoose';

const ConnectDB = async () => {
  const MongoURI = Config.DATABASE;
  return new Promise((resolve, reject) => {
    mongoose.set('strictQuery', false);
    mongoose
      .connect(MongoURI)
      .then(() => {
        console.log('MongoDB Connected');
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
        reject(false);
      });
  });
};

const cors = require('cors');
const app = express();
const port = Config.PORT;
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
    RouterApi.use('/user', require('./routes/user'));
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
