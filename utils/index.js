const auth = require('./auth')
const env = require('./env')
const injector = require('./injector')
const md5 = require('./md5')
const orm = require('./orm')
const router = require('./router')
const rpc = require('./rpc')

module.exports = Object.assign({},
  auth,
  env,
  injector,
  md5,
  orm,
  router,
  rpc
)
