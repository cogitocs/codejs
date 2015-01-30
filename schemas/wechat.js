//wechat模块

var mongoose = require('mongoose');
var valid = require('../routes/valid');
var async = require('async');
//------- 微信
var QYWXTokenSchema = mongoose.Schema({
    apppid: String, //id
    apppsecret: String, //管理组的凭证密钥
    token: String, //token 字符串
    get_ts: Date, //获取的时间撮
    js_ticket: String, //js sdk ticket
    js_ticket_expireTime: Date, //过期时间
})

module.exports.QYWXTokenSchema = QYWXTokenSchema;
QYWXTokenSchema.plugin(valid);