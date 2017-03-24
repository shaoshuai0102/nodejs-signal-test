'use strict';

const fork = require('child_process').fork;

const worker = fork('./worker.js');

setTimeout(() => {
  console.log(`killing process(pid: ${worker.pid})`);
  process.kill(worker.pid, 'SIGTERM');
}, 2000);
