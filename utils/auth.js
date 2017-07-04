
exports.auth = {
  "none":{},
  "base":JsonToken(5 * 24 * 60 * 60), //5 days, seconds
  "tmp":JsonToken(3 * 60), //3 minus, seconds
}

function JsonToken(exp){
  this.expire = exp;
  this.getToken = (json) => {
    json = JSON.stringify(json);
    return "jwt token:" + json;
  };
  this.getJson = (token) => {
    if(!token)return token;
    token = token.replace("jwt token:", "")
    return token;
  }
  return this;
}
