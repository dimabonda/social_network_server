import {model, Schema} from 'mongoose';

const Post = Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    picturePath: {type: String, default: ''},
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    likes: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true})

export default model('Post', Post);