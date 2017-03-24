'use strict';

const net = require('net');

let i = 0;
setInterval(() => {
  console.log(`Message from worker: #${i++}`);
}, 1000);


const socket = net.connect(8888, '127.0.0.1');
socket.on('readable', () => {
  const content = socket.read();
  console.log(content.toString());
})

process.on('SIGTERM', () => {
  console.log('Recieved SIGTERM');
  socket.end();
  socket.destroy();
  setTimeout(() => {
    console.log('exit');
    process.exit(0);
  }, 1000);
});
