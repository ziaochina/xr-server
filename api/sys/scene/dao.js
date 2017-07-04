//Sequelize操作数据库的代码实现，SQL语句保存在mapper中，不在本文件中，Sequelize 中文API文档 https://itbilu.com/nodejs/npm/N1yrA4HQW.html
//const Sequelize = require("sequelize")
const models = require('./model')
const mapper = require('./mapper')

let sequelize = null;
let Scene = null;
let Operate = null;

exports._init = (inject) => {
  sequelize = inject({db: true}).db

  Scene = sequelize.define('scene', models.scene, models.scene_config);
  Operate = sequelize.define('operate', models.operate, models.operate_config);
  Operates = Scene.hasMany(Operate, {constraints: false});
}

exports.create = (dto) => Scene.create(dto,{include: [Operates] } )

exports.createOperate = (dto) => Operate.create(dto);

exports.findByName = (name)=>{
  return Scene.findOne({ where: {name: name} })
}
