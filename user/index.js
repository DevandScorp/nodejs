/* eslint-disable func-names */
const db = require('../db/db');

db.connect();

function User(name) {
  this.name = name;
}

User.prototype.hello = function (who) {
  console.log(`Hello ${db.getPhrase(who)}`);
};

module.exports = User;
