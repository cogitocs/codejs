// 本系统内的附件管理模块
// 用来管理附件的上传、下载以及删除
var sprintf = require('sprintf').sprintf;
var mongoose = require('mongoose');

var AttachmentSchema = mongoose.Schema({
    file_title: { //附件文件的标题，用于在界面上显示，以及下载时用作文件名。（原始文件名）
        type: String,
        required: true
    },
    file_name: { //文件名（服务器端生成的文件名）
        type: String,
        required: true
    },
    mime_type: { //文件类型
        type: String,
    },
    size: { //字节数
        type: Number
    },
    store_path: { //文件存储路径。完整的路径，包含文件名。
        type: String,
        required: true
    }

})
AttachmentSchema.statics.add_file = function(file_title, file_name, mime_type, size, store_path, next) {
    // body...
}
AttachmentSchema.statics.remove_file = function(attachment_id, next) {
    // body...
}
module.exports.AttachmentSchema = AttachmentSchema;