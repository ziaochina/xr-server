//数据库模型的定义，在DAO文件中使用。
const Sequelize = require("sequelize")

let sequelize = null;
exports._init = (inject) =>{
  sequelize = inject({db: true}).db;

  exports.User = sequelize.define('user', cfg.user, cfg.user_config);
  exports.Log = sequelize.define('log', cfg.log, cfg.log_config);
}

let cfg = {
  user: {
    id: { type: Sequelize.BIGINT, primaryKey: true},
    name: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING,
    mobile: Sequelize.STRING,
  },
  user_config: {
    updatedAt:  false,
    createdAt: 'createtime',
    tableName: 'sys_user',
  },
  log: {
    id: { type: Sequelize.BIGINT, primaryKey: true},
    orgid: Sequelize.BIGINT,
    userid: Sequelize.BIGINT,
    deviceId: Sequelize.BIGINT,
    useragent: Sequelize.STRING,
    osfamily: Sequelize.STRING,
    osname: Sequelize.STRING,
    uafamily: Sequelize.STRING,
    browserversioninfo: Sequelize.STRING,
    uaname: Sequelize.STRING,
    devicetype: Sequelize.STRING,
    uatype: Sequelize.STRING,
    ip: Sequelize.STRING,
    url: Sequelize.STRING,
    pagename: Sequelize.STRING,
    actionname: Sequelize.STRING,
    actionResult: Sequelize.STRING,
  },
  log_config: {
      updatedAt:  false,
      createdAt: 'createtime',
      tableName: 'sys_user_log',
  }
}
