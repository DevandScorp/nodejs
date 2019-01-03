/* eslint-disable global-require */
/* eslint-disable func-names */
let phrases;

exports.connect = function () {
  phrases = require('./database.json');
};
exports.getPhrase = function (name) {
  if (!phrases[name]) {
    throw new Error('Нет такой фразы');
  }
  return phrases[name];
};
