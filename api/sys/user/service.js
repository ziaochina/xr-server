//service只有业务逻辑代码，没有操作数据库的实现代码，通过_init的依赖其它api。
const dao = require('./dao')
const utils = require('../../../utils');

let api = {
  org: true,
  web: true,
  utils: true,
}

exports._init = (inject) => {
  inject([dao, api])
}

exports.ping = (dto, ctx) => {
  ctx.token([1,2,3])
  return api.web.orginit(dto, ctx);
}

exports.log = (arr, ctx) => {
  return dao.log(arr);
}

exports.login = (dto, ctx) => {
  dao.findByEmail(dto.email).then(user => {
    ctx.return(user);
  })
}

exports.logout = (userDto) => {
    return userDto;
}

exports.countByAppId = (dto, ctx) => {
  dao.countByAppId().then(user => {
    ctx.return(user);
  })
}
