/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRoutes');
const dishRouterById = require('./routes/dishRoutesById');

const app = express();
const port = 3000;
const hostname = 'localhost';

app.use(morgan('dev'));// morgan будет выводить доп инфу
app.use(bodyParser.json());// преобразование тела запроса в json
app.use('/dishes', dishRouter);
app.use('/dishes', dishRouterById);


app.use(express.static(`${__dirname}/public`));// подгрузка статики
// next для middleware
app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('Express Server');
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log('Server is running');
});
