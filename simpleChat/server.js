/* eslint-disable no-cond-assign */
const http = require('http');
const fs = require('fs');
const chat = require('./chat');

function sendFile(fileName, res) {
  const fileStream = fs.createReadStream(fileName);
  fileStream
    .on('error', () => {
      res.statusCode = 500;
      res.end('Server error');
    })
    .pipe(res)
    .on('close', () => {
      fileStream.destroy();
    });
}
http.createServer((req, res) => {
  console.log(req.method);
  switch (req.url) {
    case '/':
      // Get не содержит request
      fs.readFile('index.html', (err, content) => {
        if (err) throw err;
        res.end(content);
      });
      break;
    case '/subscribe':
      chat.subscribe(req, res);
      break;
    case '/publish':
      // eslint-disable-next-line no-case-declarations
      let body = '';
      req
        .on('readable', () => {
          let chunk;
          while ((chunk = req.read()) !== null) {
            body += chunk;
          }
        })
        .on('end', () => {
          body = JSON.parse(body);
          chat.publish(body.message);
        });
      break;

    default:
      res.statusCode = 404;
      res.end('Not found');
  }
}).listen(3000);
