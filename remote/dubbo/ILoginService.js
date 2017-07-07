module.exports =
{
  "interface": "com.rrtimes.user.itf.ILoginService",
  "methodSignature": {
    "login": (sysUser) => (java) => [ {"$class": "com.rrtimes.user.vo.SysUser", "$": sysUser} ],
    "login": (userId) => (java) => [ {"$class": "java.lang.Long", "$": userId} ],
    "Ping": (type, value) => (java) => [ {"$class": "java.lang.String", "$": type}, {"$class": "[int", "$": value} ],
  }
}
