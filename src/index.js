import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import helmet from 'helmet';

import path from 'path';

import indexRouter from './indexRouter/index';


const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({
  extended:false
}));
app.use(bodyParser.json());

app.use(indexRouter);

app.use('/', (req,res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'));
  //__dirname : It will resolve to your project folder.s
});

// API listener
app.listen(port, () => {
  console.log(`API is running on ${port}`);
});