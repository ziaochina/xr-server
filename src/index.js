const auth = require('./auth')
const env = require('./env')
const injector = require('./injector')
const md5 = require('./md5')
const orm = require('./orm')
const router = require('./router')
const rpc = require('./rpc')

const Hapi = require('hapi');

const utils = Object.assign({},
  auth,
  env,
  injector,
  md5,
  orm,
  router,
  rpc
);

module.exports = function(config, service, remote){
  var server = this;
  this.cfg = config;
  this.initMethodName = this.cfg.service && this.cfg.service.initMethodName || '_init';
  this.apiRootUrl = this.cfg.web && this.cfg.web.apiRootUrl || '/v1';
  this.consumer =  service;
  this.remote = remote;
  this.localproviders = service;
  this.providers = Object.assign( //服务提供者
    {
      cfg: this.cfg,
      utils: utils,
      db: utils.orm(this.cfg.db),//ORM 持久化组件
    },
    utils.rpc(this.remote, this.cfg.rpc), //RPC 远程的服务提供者
    this.localproviders //本地的服务提供者
  );

   //注入服务提供者
   utils.injector(this.consumer, this.providers, this.initMethodName);

   //绑定本地API的URL路径
   let routes = utils.router(this.apiRootUrl, this.consumer, this.cfg.service, utils.auth, f => this.providers.db.transaction(f)) ;


   //创建并启动Web服务进程
   this.webServer = new Hapi.Server();
   this.webServer.connection({
       host: this.cfg.web.host,
       port: this.cfg.web.port,
   });

   //静态文件
   if(this.cfg.web.website){
     this.webServer.register(require('inert'), (err) => {
         if (err) {
             throw err;
         }
         this.webServer.route({
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: this.cfg.web.website
                }
            }
        });
     });
   }

   this.webServer.route(routes);

   this.start = function(cb){
     this.webServer.start((err) => {
        if(cb){
            cb(err, server)
        }
        else if (err) {
             throw err;
         }
         console.log('Server running at:', this.webServer.info.uri);
     });
   }
  return this;
}

//未处理的异常
process.on('uncaughtException', function (err) {
    console.error('An uncaught error occurred!' + err.message);
    console.error(err.stack);
});
