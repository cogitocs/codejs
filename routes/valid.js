/*
Schema for validation plug-in.
*/
var moment = require('moment');
module.exports = exports = function documentValid(schema, options) {
    schema.add({
        validFrom: { //有效期开始，默认为“今日”
            type: Date,
            default: new Date()
        },
        validTo: { //有效期结束，默认到“末日”
            type: Date,
            default: new Date('9999-12-31')
        },
        block: { //冻结标志，用来控制该条纪录的控制功能失效。
            type: Boolean,
            default: false
        },
        block_reason: { //冻结原因，用来存储因为什么原因冻结这条记录。
            type: String,
            default: ''
        },
        activate: { //活动标志，用来控制该条纪录为当前活动，一般不应该被删除。
            type: Boolean,
            default: true
        },
        terminated: { //停用标志，用来控制该条纪录为停用状态，该条纪录在未来不再可用，但是可以被其他历史纪录所引用（逻辑删除）。
            type: Boolean,
            default: false
        },
        createDate: { //创建日期
            type: Date,

        },
        //createUser: String,
        lastModified: { //最后修改时间戳
            type: Date,

        },
    });
    schema.pre('save', function(next) {
        this.lastModified = new Date();
        if (!this.createDate) {
            this.createDate = new Date();
        }
        //处理validfrom和validto
        var from = moment(this.validFrom).startOf('day').toDate();
        var to = moment(this.validTo).endOf('day').toDate();
        // if (from.getTime()<=to.getTime()) {

        // };
        this.validFrom = from;
        this.validTo = to;
        next();
    })
    schema.methods.toggle_block = function() {
        this.block = !this.block;
    }
    schema.methods.toggle_activate = function() {
        this.activate = !this.activate;
    }
    schema.methods.isValid = function() {
        var now = new Date();
        return (this.validFrom <= now && now <= this.validTo);
    }
    schema.methods.toISODate = function(date) {
        if (date) {
            return moment(date).format('YYYY-MM-DD');
        } else if ('undefined' == date) {
            return '';
        } else {
            return date;
        };
    }
    schema.methods.toISOTime = function(date) {
        if (date) {
            return moment(date).format('HH:mm:ss');
        } else if ('undefined' == date) {
            return '';
        } else {
            return date;
        };
    }
    schema.methods.toISODatetime = function(date) {
        if (date) {
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        } else if ('undefined' == date) {
            return '';
        } else {
            return date;
        };
    }
    schema.methods.delete = function(cb) { //逻辑删除数据记录
        this.terminated = true; //
        this.block = true; //逻辑删除
        this.block_reason = '标记删除'; //逻辑删除
        this.activate = false; //逻辑删除
        this.save(cb);
    }
    if (options && options.index) {
        schema.path('lastModified').index(options.index)
    }
}