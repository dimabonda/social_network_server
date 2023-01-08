const {model, Schema} = require('mongoose');

const Comment = Schema({
    text: {type: String, required: true},
    post: {type: Schema.Types.ObjectId, ref: 'Post', required: true},
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    parentComment: {type: Schema.Types.ObjectId, ref: 'Comment'}
}, {timestamps: true})

module.exports = model('Comment', Comment);