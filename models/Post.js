const {model, Schema} = require('mongoose');

const Post = Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    picturePath: {type: String, default: ''},
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    likes: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true})

module.exports = model('Post', Post);