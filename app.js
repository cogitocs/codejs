var express = require('express');
var flash = require('connect-flash');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var colors = require('colors');
var session = require('express-session');
//这个总是报错，将express换成session;
var mongoStore = require('connect-mongo')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require("./models/user");
var routes = require('./routes/index');
var users = require('./routes/users');
var post_add = require('./routes/post_add');
var async = require('async');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(favicon());
// app.use(express.favicon(options.favicon))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// app.use('/', routes);
// app.use('/users', users);
// // console.log(post_add);
// app.use('/post_add', post_add);
// app.use('./admin');
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     console.log(err);
//     next(err);
// });


// error handlers

// development error handler
// will print stacktrace
// console.log(app.get('env'));
// mongodb_uri = 'mongodb://localhost/ivan?poolSize=5';

if (app.get('env') === 'development') {
    mongodb_uri = 'mongodb://localhost/ivan?poolSize=5';

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
//conntect database
mongoose.connect(mongodb_uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function() {
    console.log(colors.yellow('Connected to Mongoose on ' + mongodb_uri));
});
//use auth
// app.use(express.compress()); //use compress
// app.use(express.methodOverride());
// app.use(express.bodyParser());
// app.use(express.cookieParser('pony'));

app.use(flash()); // use flash function
app.use(passport.initialize()); //initialing passport midleware
app.use(passport.session()); //enabling passport session support
app.use(session({
    secret: "FTDFGHI@#$%^*&TDJHUUIY&^%^ETFGUIY^&*%^&$%^$^*(",
    store: new mongoStore({
        mongoose_connection: db,
    })
}));
passport.use(new LocalStrategy(function(username, password, done) {
    console.log(username);
    console.log(password);
    var obj = {
        $or: [{
            username: username,
        }, {
            email: username,

        }]
    }
    async.waterfall([

        function(cb) { //获取user
            // console.log(User);
            User.findOne(obj, cb);
        },
        function(user_obj, cb) { //获取user
            // console.log(user_obj);
            if (user_obj) {
                if (user_obj.block) {
                    cb(new Error("该用户已锁定", null));
                } else {
                    var user_id = user_obj.id;
                    User.findOne({
                        _id: user_id
                    }, cb)
                };
            } else {
                cb(new Error("没有找到该用户", null));
            };
        },
        function(user_obj, cb) { //验证密码
            console.log(user_obj);
            if (user_obj) {
                user_obj.comparePassword(password, function(err, isMatch) {
                    if (err) {
                        cb(err, null);
                    };
                    if (isMatch) {
                        if (user_obj.isValid && !user_obj.block) {
                            console.log('success login user:' + username);
                            user_obj.lastLogin = new Date(); //update lastLogin timestamp
                            user_obj.save();
                            return cb(null, user_obj);
                        } else {
                            cb(new Error("该用户已锁定", null));
                        };

                    } else {
                        console.log('Invalid password');
                        cb(new Error("无效的密码", null));
                    }
                })
            } else {
                cb(new Error("无效的用户名", null));
            };
        }
    ], function(err, result) {
        if (err) {
            return done(null, false, err);
        };
        return done(null, result)
    });

}));
passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser(function(token, done) {
    User.findById(token).exec(function(err, user) {
        done(err, user);
    });

});
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
//登录授权
function checkAuth(req, res, next) {
        // console.log('start to check auth');
        //console.log(req.method,req.url,req.sessionStore,req.sessionID);
        // console.log(req.cookies);

        if (!req.user) {
            // res.send('You are not authorized to view this page'); //这行必须删掉，因为启用了compress之后会发生严重问题。
            res.redirect('/login');
        } else {
            res.locals.page_tcode = '';
            return next();
        }
    }
    //中间件
require('./routes/admin')(app);

module.exports = app;