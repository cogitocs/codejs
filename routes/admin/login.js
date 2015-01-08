var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../../models/user');

var login = function(req, res) {

	var render_data = {
		title: 'Code Js Login'
	}
	console.log('message');
	res.render('login', render_data);
}
console.log(passport);
// var login_action = passport.authenticate('local', {
//     failureRedirect: '/admin/login',
//     failureFlash: true,
// })
var login_action = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/admin/login',
	failureFlash: true
})
// var login_action = function(req, res, next) {
// 	console.log(req.body);
// 	// console.log(res);
// 	passport.authenticate('local', {
// 		successRedirect: '/',
// 		failureRedirect: '/admin/login',
// 		failureFlash: true
// 	})
// }
var regist_action = function(req, res) {
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	console.log('message');
	var regist_obj = {
		firstname: firstname,
		lastname: lastname,
		username: username,
		email: email,
		password: password
	}
	User.create(regist_obj, function(err, data) {
		console.log(err);
		if (err) {
			return res.json({
				code: "ERR",
				msg: "内部服务器错误!"
			})
		}
		return res.json({
			code: "OK",
			data: data,
			msg: "恭喜你注册成功!"
		})

	})
}

module.exports = function(app) {
	var __base_path = '/admin';
	app.get(__base_path + '/login', login);
	app.post(__base_path + '/login', login_action); //登录
	app.post(__base_path + '/regist', regist_action); //注册
};