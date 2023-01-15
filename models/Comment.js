import {model, Schema} from 'mongoose';

const Comment = Schema({
    text: {type: String, required: true},
    post: {type: Schema.Types.ObjectId, ref: 'Post', required: true},
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    parentComment: {type: Schema.Types.ObjectId, ref: 'Comment'}
}, {timestamps: true})

export default model('Comment', Comment);