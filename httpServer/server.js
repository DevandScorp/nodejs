const http = require('http');

const server = new http.Server();

server.listen(3000);

server.on('request', (req, res) => {
  res.end('Hello, world!');
});
