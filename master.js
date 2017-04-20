'use strict';

const fork = require('child_process').fork;
const net = require('net');

const worker = fork('./worker.js');

let timer;

let doNotSend = false;


setTimeout(() => {
  console.log(`killing process(pid: ${worker.pid})`);
  clearInterval(timer);
  doNotSend = true;
  process.kill(worker.pid, 'SIGTERM');
}, 5000);

const server = net.createServer();
server.listen(8888, '127.0.0.1');

setInterval(() => {
  server.getConnections(count => console.log('connections: ', count));
}, 1000);

server.on('connection', socket => {
  timer = setInterval(() => {
    !doNotSend && socket.write('123');
  }, 1000);
});


