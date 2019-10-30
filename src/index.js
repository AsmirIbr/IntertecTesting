import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import helmet from 'helmet';
import jwt from 'express-jwt';

import path from 'path';

import indexRouter from './indexRouter/index';

import secrets from '../config/secrets';
import publicRoutes from '../config/public_routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({
  extended:false
}));
app.use(bodyParser.json());

const secret = secrets[process.env.NODE_ENV || 'dev'];
const envPublicRoutes = publicRoutes[process.env.NODE_ENV || 'dev'];
envPublicRoutes.push(/\/public/);

app.use(jwt({ secret }).unless({
  path: envPublicRoutes
}));

app.use(indexRouter);

// app.use('/', (req,res) => {
//   res.sendFile(path.join(__dirname+'/public/index.html'));
// });

// API listener!
app.listen(port, () => {
  console.log(`API is running on ${port}!`);
});