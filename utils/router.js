
exports.router = (path, api, cfg, auth, transaction, routes) =>{
  return resolveApiPath(path, api, cfg, auth, transaction, routes)
}

function resolveApiPath(path, api, cfg, auth, transaction, routes){
  routes = routes || [];
  for (let key in api) {
    let method = api[key];
    let methodPath = path + '/' + key;
    if (!api.hasOwnProperty(key) || !!key && key.toString()[0]=="_"){
      continue;
    }
    else if (typeof method == "object"){
      resolveApiPath(methodPath, method, cfg, auth, transaction, routes)
    }
    else if (typeof method == 'function'){
      //method.url = methodPath;
      console.log(methodPath);
      routes.push({
          method: 'GET',
          path: methodPath,
          handler: (request, reply) => wrapper(request, reply, cfg, auth, transaction, method)
      });
      routes.push({
          method: 'POST',
          path: methodPath,
          handler: (request, reply) => wrapper(request, reply, cfg, auth, transaction, method)
      });
    }
  }
  return routes;
}

function wrapper(request, reply, cfg, auth, transaction, handler){
  let ctx = context(request, reply, auth);
  if(!ctx.validate(handler))return;
  let promise = f => new Promise( resolve => resolve(f()));
  if(cfg && cfg.transactionType == "auto"){
    promise = transaction; //自动事务
  }
  let data = request.payload || request.url.query
  promise(() => handler(data, ctx))
  .then(value => {
    if(value !== undefined){
      ctx.return(value);
    }
  })
  .catch(ctx.error);
}

function context(request, reply, auth){
  let res = {};
  let ctx = this; 
  Object.assign(ctx,
  {
    request,
    return: (value) => {
      res.result = true;
      res.value = value;
      reply(res);
    },
    error: (error) => {
      res.result = false;
      res.error = error;
      reply(res);
    },
    token: (json, authType) => {
      authType = authType || "base"
      if(json === undefined){
        return ctx.tokenInHeader;
      }else{
        res.token = auth && auth[authType].getToken(json) || json;
      }
      return this;
    },
    reply: reply,
    validate: (handler) =>{
      if(!request.headers.token && handler.auth !== false){
        ctx.error("未登录");
        return false;
      }else{
        let authType = handler.auth || "base";
        try{
          ctx.tokenInHeader = auth && auth[authType].getJson(request.headers.token || "");
        }catch(ex){
          ctx.error("未登录");
        }
        return true;
      }
    }
  });

  return this;
}
