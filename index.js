'use strict';
//TODO: auth(token), build, appLoad, rpc-dubbo
//DONE: webserver, service struct, injector, db, transition, rpc-rest, auth

const Hapi = require('hapi');

const cfg = require('./config');
const initMethodName = cfg.api && cfg.api.initMethodName || '_init';
const rootPath = cfg.api && cfg.api.rootPath || '/v1';
const remote = require('./remote');
const utils = require('./utils');
const apis = require('./api');
let consumer =  apis;
let providers = apis;

//服务提供者
providers = Object.assign(
  {
    cfg: cfg,
    utils: utils,
    db: utils.orm(cfg.db),//ORM 持久化组件
  },
  utils.rpc(remote, cfg.rpc), //RPC 远程的服务提供者
  providers //本地的服务提供者
);

//注入服务提供者
utils.injector(consumer, providers, initMethodName);

//绑定本地API的URL路径
let routes = utils.router(rootPath, apis, cfg.api, utils.auth, f => providers.db.transaction(f)) ;

//创建并启动Web服务进程
const webServer = new Hapi.Server();
webServer.connection({
    host: cfg.web.host,
    port: cfg.web.port,
});

//console.log(routes);
webServer.route(routes);

webServer.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', webServer.info.uri);
});

//未处理的异常
process.on('uncaughtException', function (err) {
    console.error('An uncaught error occurred!' + err.message);
    console.error(err.stack);
});
