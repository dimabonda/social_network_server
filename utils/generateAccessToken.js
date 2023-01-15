import jwt  from 'jsonwebtoken';
// import {secret} from '../config.js';

export const generateAccessToken = (id) => {
    const payload = {
        id
    }

    return jwt.sign(payload, process.env.JWT_SECRET)
}