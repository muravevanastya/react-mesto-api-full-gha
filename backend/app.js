// const path = require('path');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const NotFound = require('./errors/NotFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

// const indexHTML = path.resolve(__dirname, '../frontend/build/index.html');

// const corsConfig = {
//   origin: [
//     'https://api.places.nomoredomains.monster',
//     'https://places.nomoredomains.monster',
//     'http://localhost:3000',
//   ],
//   credentials: true,
//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   allowedHeaders: ['Content-Type', 'Authorization', 'origin'],
// };

// app.use(cors({ origin: '*' }));

// const allowedCors = [
//   'https://places.nomoredomains.monster',
//   'https://api.places.nomoredomains.monster',
//   'http://localhost:3000',
//   'http://localhost:3001',
// ];

// app.use((req, res, next) => {
//   const { origin } = req.headers;
//   const { method } = req;
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
//   const requestHeaders = req.headers['access-control-request-headers'];

//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Credentials', 'true');
//   }

//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);

//     return res.end();
//   }

//   return next();
// });
app.use(cors());

app.use(bodyParser.json());
// app.use('/', express.static('build'));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(requestLogger);

// app.get('/*', (req, res) => res.sendFile(indexHTML));

app.use('/', require('./routes/auth'));

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(errorLogger);

app.use(errors());

app.use('*', (req, res, next) => {
  next(new NotFound('Адреса по вашему запросу не существует'));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

app.listen(PORT);
