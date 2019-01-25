/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const authenticate = require('../authentication');
const authenticateAdmin = require('../adminAuthentication');
const Dishes = require('../models/dishes');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());
dishRouter.route('/')
  .get(authenticateAdmin.verifyAdmin, (req, res, next) => {
    Dishes.find({})
      .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
      }, err => next(err))
      .catch(err => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    console.log(req.body);
    console.log(req.user);
    Dishes.create(req.body)
      .then((dish) => {
        console.log('Dish created', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
      }, err => next(err))
      .catch(err => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;// operation not supported
    res.end('PUT operation not supported on /dishes');
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Dishes.deleteMany({})
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      }, err => next(err))
      .catch(err => next(err));
  });
module.exports = dishRouter;
