module.exports = {
  web: {
    "host": "localhost",
    "port": 8000,
  },
  api: {
    initMethodName: "_init",
    rootPath: "/v1",
    transactionType: "auto",
  },
  rpc: {
    rest: {
      serverUrl: "http://dev.rrtimes.com:8088",
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
