const { log } = require('node:console');
const os = require('node:os') // ! better than require('os')

log('Operating System name: ', os.platform());
log('Operating System version: ', os.release());
log('CPUs : ', os.cpus());
log('Free Memory: ', os.freemem() / 1024 / 1024)
log('Total Memory: ', os.totalmem() / 1024 / 1024)
log('utpime: ', os.uptime() / 60 / 60)