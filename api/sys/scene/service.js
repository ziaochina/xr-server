//service只有业务逻辑代码，没有操作数据库的实现代码，通过_init的依赖其它api。
const dao = require('./dao')
const utils = require('../../../utils');
const api = { 
}

exports._init = (inject) => {
  inject([dao, api])
}

exports.ping = (dto, ctx) => {
  return dto || true;
}

exports.create = (dto, ctx) => {
  dto = {
    id: 100000000,
    orgId: 0,
    userId: 0,
    name: 'test node',
    operates:[
      {
        id: 1000000000,
        url: '/11111111111',
        parameter: 'ppppp',
      },
      {
        id: 1000000001,
        url: '/11111111111',
        parameter: 'ppppp',
      }
    ]
  };
  let optDto = {
    id: 1000000002,
    url: '/11111111111',
    parameter: 'ppppp',
  }
  return dao.create(dto)
  .then(r=>dao.createOperate(optDto))
  .then(r=>ctx.return(r))
}

exports.createOperate = (dto, ctx) => {
  dto = {
    id: 1000000002,
    url: '/11111111111',
    parameter: 'ppppp',
  }
  dao.createOperate(dto).then(r=>ctx.return(r));
}

exports.delete = (dto, ctx) => {
  return api.org.ping("call from sys/user.");
}

exports.findById = (dto, ctx) => {
  return api.org.ping("call from sys/user.");
}

exports.findByAll = (dto, ctx) => {
  return api.org.ping("call from sys/user.");
}
