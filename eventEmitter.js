const Emitter = require('events').EventEmitter;

const server = new Emitter();

server.on('request', (req) => {
  req.approved = true;
});

server.on('request', (req) => {
  console.log(req);
});

server.emit('request', { from: 'Client' });
server.emit('request', { from: ' Another Client' });
