const util = require('util');
const User = require('./user/index');

new User('Artem').hello('name');

const obj = {
  a: 5,
  b: 6,
};

console.log(util.inspect(obj));// красиво выводит все объекты
// еще есть форматированный вывод и прочие полезные методы
console.error(obj);// выведет в поток ошибок
