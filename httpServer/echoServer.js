/* eslint-disable no-debugger */
/* eslint-disable no-console */
const http = require('http');
const url = require('url');
const log = require('winston');// только эту хрень конфигурировать надо
// echo server- это сервер,у которого адрес с echo
// с помощью supervisor можно перезапускать программы. Как live-server
// следит за одним файлом и за подключенными к этому файлу модулями
// хочешь дебажить? ставишь в нужном месте debugger и запускаешь node debug node.js
const server = new http.Server((req, res) => {
  console.log(req.method, req.url);
  console.log(req.headers);
  // debugger;
  // ты можешь устанавливать header'ы ,чтобы конфигурировать все
  const urlParsed = url.parse(req.url, true);// true позволит получить объект с аргументами ссылки
  console.log(urlParsed);
  if (urlParsed.pathname === '/echo' && urlParsed.query.message) {
    log.info('Got request');
    res.end(urlParsed.query.message);
    console.log('Hello');
  } else {
    // log.error('Problems');
    res.statusCode = 404;
    res.end('Page not found');
  }
});

server.listen(3000);
