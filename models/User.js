import {model, Schema} from 'mongoose';

const UserSchema = Schema({
    firstName: {type: String, required: true, maxlength: 5},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String, default: ''},
    location: {type: String, default: ''},
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
})

export default model('User', UserSchema)