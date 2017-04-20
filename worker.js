'use strict';

const net = require('net');

let i = 0;
setInterval(() => {
  console.log(`keep alive: #${i++}`);
}, 1000);


const socket = net.connect(8888, '127.0.0.1');
socket.on('readable', () => {
  const content = socket.read();
  if (content) {
    console.log('worker recieved', content.toString());
  }
})

process.on('message', message => {
  if (message !== 'kill-worker') return;

  console.log('Recieved kill-worker');
  socket.end();
  socket.destroy();
  setTimeout(() => {
    console.log('exit');
    process.exit(0);
  }, 1000);
});
