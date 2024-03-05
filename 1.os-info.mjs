import { log } from 'node:console';
import { platform, release, cpus, freemem, totalmem, uptime } from 'node:os'; // ! better than require('os')

log('Operating System name: ', platform());
log('Operating System version: ', release());
log('CPUs : ', cpus());
log('Free Memory: ', freemem() / 1024 / 1024)
log('Total Memory: ', totalmem() / 1024 / 1024)
log('utpime: ', uptime() / 60 / 60)