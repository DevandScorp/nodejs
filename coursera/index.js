const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  console.log(`Request for ${req.url}`);
  if (req.method === 'GET') {
    let fileUrl = '';
    if (req.url === '/') fileUrl = '/index.html';
    else fileUrl = req.url;

    const filePath = path.resolve(`./public${fileUrl}`);
    const fileExt = path.extname(filePath);
    if (fileExt === '.html') {
      res.setHeader('Content-Type', 'text/html');
      fs.exists(filePath, (exists) => {
        if (!exists) {
          res.statusCode = 404;
          res.end('ERROR');
        }
      });
      res.statusCode = 200;
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end(`<html><body><h1>Error 404: ${fileUrl} not a HTML file</h1></body></html>`);
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
  }
});
server.listen(3000, 'localhost', () => {
  console.log('Server is running');
});
