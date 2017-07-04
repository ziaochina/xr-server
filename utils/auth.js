const jwt = require('jsonwebtoken');
// const base64 = require('js-base64').Base64;
var apiKey = "rrtimes.com/login/token/Key";
var secret = new Buffer(apiKey, 'base64');

exports.auth = {
  "none":{},
  "base":new JsonToken(5 * 24 * 60 * 60), //5 days, seconds
  "tmp":new JsonToken(3 * 60), //3 minus, seconds
}

function JsonToken(exp){
  this.expire = exp;
  this.getToken = function(sub){
    sub = JSON.stringify(sub);
    let exp = Math.floor(Date.now() / 1000) + this.expire;
    let token = jwt.sign({ sub: sub, exp: exp }, secret, { algorithm: 'HS512' });
    return token;
  };
  this.getJson = function (token){
    if(!token)return token;
    let json = jwt.verify(token, secret, { algorithms: ['HS512'] });
    return JSON.parse(json.sub);
  }
  return this;
}
