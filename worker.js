'use strict';

let i = 0;
setInterval(() => {
  console.log(`Message from worker: #${i++}`);
}, 1000);

process.on('SIGTERM', () => {
  console.log('Recieved SIGTERM');
});
