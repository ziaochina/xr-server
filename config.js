module.exports = {
  web: {
    "host": "localhost",
    "port": 8000,
    "rootPath": "/v1",
  },
  service: {
    "md5key": "yiJia9*",
    "initMethodName": "_init",
    "transactionType": "auto",
  },
  rpc: {
    rest: {
      "serverUrl": "http://dev.rrtimes.com:8088",
    },
  },
  db: {
    "type": "mysql",
    "user": "root",
    "pwd": "rrsd_2016",
    "host": "192.168.1.201",
    "port": 3306,
    "database": "dbmanage_dev",
  }
}
