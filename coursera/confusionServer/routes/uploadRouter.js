/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
// eslint-disable-next-line no-unused-vars
const multer = require('multer');
const authenticate = require('../authentication');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/images');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },

});

const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('You can upload only image files!'), false);
  }
  callback(null, true);
};
const upload = multer({ storage, fileFilter: imageFileFilter });
const uploadRouter = express.Router();
uploadRouter.use(bodyParser.json());
uploadRouter.route('/')
  .get(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('GET operations not supported on /imageUpload');
  })
  .post(authenticate.verifyUser, upload.single('imageFile'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file);
  })
  .put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operations not supported on /imageUpload');
  })
  .delete(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('DELETE operations not supported on /imageUpload');
  });

module.exports = uploadRouter;
