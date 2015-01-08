//用户相关数据
/*
User Schema
1.password neeed encrypted.
2.cannot use register's key data .
3.protect user's key data .
 */
var SALT_WORK_FACTOR = 10;
var util = require('util');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var valid = require('../routes/valid');
var async = require('async');
//存储用户数据的表
var UserSchema = mongoose.Schema({
	firstname: {
		type: String,
		require: true
	},
	lastname: {
		type: String,
		require: true
	},
	username: {
		type: String,
	},
	email: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	birthday: {
		type: Date
	},
	gender: { //性别 M：男 F：女
		type: String,
		'enum': ['M', 'F']
	},
	avatar: { //头像的文件名
		type: mongoose.Schema.Types.ObjectId,
		ref: 'GridFile'
	},
	qq: { //QQ号
		type: String
	},
	wechat: { //微信号
		type: String

	},
	university: { //就读大学
		type: String

	},
	company: { //所属公司
		type: String
	}


});

UserSchema.plugin(valid);
UserSchema.index({
	email: 1,
	username: 1

}, {
	unique: true,
	dropDups: true
}); //定义复合索引——唯一键
UserSchema.pre('save', function(next) {
	var user = this;

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});
UserSchema.virtual('full_name').get(function() {
	return [this.firstname, this.lastname].join(' ');
})
UserSchema.virtual('gender_zh').get(function() {
	return (this.gender == 'M') ? '男' : '女';
})

UserSchema.statics.genPasswordSalt = function(password, cb) {
		bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
			if (err) return cb(err, null);

			bcrypt.hash(user.password, salt, function(err, hash) {
				if (err) return cb(err, null);
				cb(null, hash);
			});
		});
	}
	// Password verification
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
	console.log(this.password);
	console.log(candidatePassword);
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		console.log(isMatch);
		if (err) return cb(err);
		cb(null, isMatch);
	});
};
module.exports = UserSchema;
