///<reference path="../typings/tsd.d.ts" />
var crypto=require("crypto");
//console.log(crypto.getCiphers());//含支持的加密算法的名字

//md5加密
var md5 = crypto.createHash('md5');
md5.update('123');
var d = md5.digest('hex');
console.log(d);

//加密
     var cipher = crypto.createCipher('aes192', '123');
     cipher.setAutoPadding(true); //default true
     var ciph = cipher.update('123123','utf8', 'base64');
     ciph += cipher.final('base64');
     console.log(ciph);

//解密
     var decipher = crypto.createDecipher('aes192', '123');//秘钥不同报错
     cipher.setAutoPadding(true);
     var txt = decipher.update(ciph, 'base64', 'utf8');
     txt += decipher.final('utf8'); 
     console.log(txt);