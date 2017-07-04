const auth = require('./auth')
const injector = require('./injector')
const md5 = require('./md5')
const orm = require('./orm')
const router = require('./router')
const rpc = require('./rpc')

module.exports = Object.assign({},
  auth,
  injector,
  md5,
  orm,
  router,
  rpc
)
