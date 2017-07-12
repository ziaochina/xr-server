const xrServer = require('./../src')
const config = require('./config');
const service = require('./service');
const remote = require('./remote');

const server = new xrServer(config, service, remote);

server.start();
