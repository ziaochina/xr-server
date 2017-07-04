const rp = require('request-promise');

exports.rpc = (remote, rpccfg) => {
  let proviers = Object.assign({},
    restWrapper(remote.rest, rpccfg && rpccfg.rest),
    dubboWrapper(remote.dubbo, rpccfg && rpccfg.dubbo)
  )
  return proviers
}

const restWrapper = (apis, restcfg, apiProxy, serverUrl) => {
  apiProxy = apiProxy || {};
  serverUrl = serverUrl || restcfg && restcfg.serverUrl;
  for (let key in apis) {
    if (!apis.hasOwnProperty(key))continue;
    let api = apis[key];
    if(key == '_serverUrl'){
      serverUrl = api;
    }
    else if(api && typeof api == "object"){
      restWrapper(api, restcfg, apiProxy[key] = {}, serverUrl)
    }
    else if(typeof api == "function"){
      apiProxy[key] = restApiProxy(apis[key], serverUrl)
    }
  }
  return apiProxy;
}
const restApiProxy = (fun, serverUrl) => {
  return function () {
    let args = Array.from(arguments);
    args.unshift((url, data)=>{
      let headers = {}
      let ctx = args[args.length-1];
      if(ctx && ctx.res && ctx.res.token){
        headers.token = ctx.res.token;
      }
      else if(ctx && ctx.request && ctx.request.headers.token){
        headers.token = ctx.request.headers.token;
      }
      return rp({
        method: 'POST',
        uri: serverUrl + url,
        headers: headers,
        body: data,
        json: true,
      })
    })
    return fun.apply(null, args);
  }
}

const dubboWrapper = (apis) => {

}
