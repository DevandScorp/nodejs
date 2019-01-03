const express = require('express');
const bodyParser = require('body-parser');

const dishRouterById = express.Router();
dishRouterById.use(bodyParser.json());
dishRouterById.route('/:dishId')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();// продолжит искать все,что связано с dishes
  })
  .get((req, res, next) => {
    res.end(`Will send the ${req.params.dishId} info`);
  })

  .post((req, res, next) => {
    res.statusCode = 403;// operation not supported
    res.end('POST operation not supported on /dishes:dishId');
  })

  .put((req, res, next) => {
    res.write(`Updating the dish ${req.params.dishId} `);
    res.end(`Will update the dish ${req.body.name} with details ${req.body.description}`);
  })

  .delete((req, res, next) => {
    res.end('Deleting all the dishes');
  });
module.exports = dishRouterById;
