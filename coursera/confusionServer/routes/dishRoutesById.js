const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Dishes = require('../models/dishes');

const dishRouterById = express.Router();
dishRouterById.use(bodyParser.json());
dishRouterById.route('/:dishId')
  .get((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
      }, err => next(err))
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;// operation not supported
    res.end('POST operation not supported on /dishes:dishId');
  })
// запросы выглядят как {"label" : "hot"}
// и так можно изменять состояния полей
// можно менять несколько полей
  .put((req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishId, {
      $set: req.body,
    }, { new: true })
      .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
      }, err => next(err))
      .catch(err => next(err));
  })

  .delete((req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
      .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
      }, err => next(err))
      .catch(err => next(err));
  });
module.exports = dishRouterById;
