//微信订阅号的API库

var crypto = require('crypto');
var _ = require('underscore');
var request = require('request');
var async = require('async');

var wechat = require('wechat-enterprise');

var appToken = "IvanPeng2001",
    // sEncodingAESKey = "EIbHsDb5qQmliNPeLakgFjUQXolutnDlHsQzJJG3r4N",
    // sCorpID = "wx3bd6f3aa75c0c7e7";
    appid = "wx89f73281f44727ac",
    appEncodingAESKey = "2aec75d9341268b1bea80f833ac53646"


/*-------------------------主动调用——开始----------------------------*/
var wx_host = "https://qyapi.weixin.qq.com/cgi-bin/";
// 简化生成url的方法
var make_url = function(path, params) {
    var ret = [wx_host, path];
    var p = _.map(params, function(val, key) {
        return key + '=' + val;
    })
    if (p.length) {
        ret.push('?');
        ret.push(p.join('&'));
    };
    return ret.join('');
}



var update_token = function(appid, appsecret, cb) {
    var uri = make_url('gettoken', {
        appid: appid,
        appsecret: appsecret
    });
    console.log(uri);
    async.waterfall([

        function(cb) {
            request({
                method: 'GET',
                uri: uri,
            }, function(err, response, body) {
                if (err) {
                    cb(err, null);
                } else {
                    var body = JSON.parse(body);
                    cb(null, body);
                };
            })
        },
        function(tk, cb) { //存到数据库，以备后面使用。
            if (tk) {
                async.waterfall([

                    function(cb) {
                        QYWXToken
                            .findOne({
                                appid: appid,
                                appsecret: appsecret,
                            }).exec(cb);
                    },
                    function(qywxtoken, cb) {
                        if (qywxtoken) { //已经存在了，就更新一下token，否则创建一条新的
                            qywxtoken.token = tk.access_token;
                            qywxtoken.get_ts = new Date();
                            qywxtoken.save(cb);
                        } else {
                            QYWXToken.create({
                                appid: appid,
                                appsecret: appsecret,
                                token: tk.access_token,
                                get_ts: new Date()
                            }, cb);
                        };
                    }
                ], cb);

            } else {
                cb('获取token失败', null);
            };
        }
    ], function(err, result) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result.token);
        };
    })

}

// 从数据库中获取缓存的token
// Test: PASS
var get_token = function(appid, appsecret, cb) {
    console.log(appid, appsecret);
    async.waterfall([

        function(cb) {
            QYWXToken
                .findOne({
                    appid: appid,
                    appsecret: appsecret,
                })
                .exec(cb);
        },
        function(tk, cb) {
            if (tk) {
                var now = new Date();
                if (now.getTime() - tk.get_ts.getTime() < 300000) { //5分钟后即将过期，重新获取一下，并更新这条数据
                    cb(null, tk.token); //有效期内，直接返回
                } else { //要过期了，重新获取一个
                    cb(null, null);
                };
            } else {
                cb(null, null);
            };
        },
        function(tk, cb) {
            if (!tk) { //没找到，获取一个新的
                update_token(appid, appsecret, cb);
            } else {
                cb(null, tk);
            };
        }
    ], cb);
}
module.exports.get_token = get_token; //获取token，用来像微信服务器发出请求的时候带上



// 返回结果
var send_message = function(appid, appsecret, msg, cb) {
    async.waterfall([

        function(cb) {
            get_token(appid, appsecret, cb);
        },
        function(tk, cb) {
            var uri = make_url('message/send', {
                access_token: tk,
            });
            // console.log(uri);
            request({
                method: 'POST',
                uri: uri,
                body: JSON.stringify(msg),
            }, function(err, response, body) {
                if (err) {
                    cb(err, null);
                } else {
                    var ret = JSON.parse(body);
                    cb(err, ret);
                };
            })
        }
    ], function(err, result) {
        cb(err, result);
    })
}
var gen_message = function(msgtype, agentid, body) {
    var msg = {
        "touser": "",
        "toparty": "",
        "totag": "",
        "msgtype": msgtype,
        "agentid": agentid,

        "safe": "0"
    };
    if (msgtype == 'text') {
        msg = _.extend(msg, {
            "text": {
                "content": "Holiday Request For Pony(http://xxxxx)"
            },
        })
    };
}
var gen_text_message = function(mb) {
    var msg = {
        msgtype: 'text',
    };
    _gen_message
    msg = _.extend(msg, mb);
    return msg;
}

module.exports.gen_text_message = gen_text_message;
module.exports.send_message = send_message;

var VerifyURL = function(sVerifyMsgSig, sVerifyTimeStamp, sVerifyNonce, sVerifyEchoStr, cb) {
    var shasum = crypto.createHash('sha1');
    var arr = [sToken, sVerifyTimeStamp, sVerifyNonce, sVerifyEchoStr].sort();
    shasum.update(arr.join(''));
    var signature = shasum.digest('hex');
    if (signature == sVerifyMsgSig) { //确实是发给当前这个企业号的，通过验证
        //解密，把原文解来
        //aes解密，
        // console.log(crypto.getCiphers());
        var key = new Buffer(sEncodingAESKey, 'base64');
        // console.log(key.length,key);
        var iv = key.slice(0, 16); //取key的前16位作为iv
        // console.log(iv.length,iv);
        var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        decipher.setAutoPadding(true);
        var dec_msg = '';

        try {
            dec_msg = decipher.update(sVerifyEchoStr, 'base64', 'utf8');
            dec_msg += decipher.final('utf8');
            //跟user的password进行比较
            var b = Buffer(dec_msg);
            var rnd = b.slice(0, 16).toString(),
                msg_len = b.slice(16, 20).readInt32BE(0);
            var msg = b.slice(20, 20 + msg_len).toString();
            var crop_id = b.slice(20 + msg_len).toString();
            var ret = {
                rnd: rnd,
                msg_len: msg_len,
                msg: msg,
                crop_id: crop_id,
            };
            // console.log(b.slice(0, 16).toString(), '', b.slice(16, 20).readInt32BE(0));
            cb(null, ret);
        } catch (err) {
            console.log(err);
            cb(err, null);
        }
    } else {
        cb('身份验证失败', null);
    };
}
var wxapi = function(req, res, next) {
    console.log(req.query.corpid);
    // var _config = {
    //     token: "gisipeng2015",
    //     encodingAESKey: "2aec75d9341268b1bea80f833ac53646",
    //     corpId: "wx89f73281f44727ac",
    // }
    // var _route = wechat
    //     .text(function(message, req, res, next) {
    //         console.log('text:', message);
    //         res.reply('你说的是：' + message.Content);
    //     })
    // wechat(_config, _route)(req, res, next);
}
module.exports = function(app) {
    var __base_path = '/admin';
    app.get(__base_path + '/wxapi', wxapi);
    app.use('/wxapi', wxapi);
    app.post('/wxapi', wxapi);
};
module.exports.VerifyURL = VerifyURL;