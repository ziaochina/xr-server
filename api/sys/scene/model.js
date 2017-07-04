//数据库模型的定义，在DAO文件中使用。
const Sequelize = require("sequelize")

module.exports = {
  scene: {
    id: { type: Sequelize.BIGINT, primaryKey: true},
    orgId: Sequelize.BIGINT,
    userId: Sequelize.BIGINT,
    name: Sequelize.STRING,
  },
  scene_config: {
    updatedAt:  false,
    createdAt: 'createtime',
    tableName: 'sys_scene',
  },
  operate: {
    id: { type: Sequelize.BIGINT, primaryKey: true},
    menuId: Sequelize.BIGINT,
    menuName: Sequelize.STRING,
    operationName: Sequelize.STRING,
    url: Sequelize.STRING,
    parameter: Sequelize.STRING,
    result: Sequelize.STRING,
    description: Sequelize.STRING,
  },
  operate_config: {
    updatedAt: false,
    createdAt: false,
    tableName: 'sys_scene_operate',
  },
}
