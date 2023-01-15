import User from '../models/User.js';
import { createHashPassword } from '../utils/createHashPassword.js';
import { checkPassword } from '../utils/checkPassword.js';
import { validationResult } from 'express-validator';
import { generateAccessToken }from '../utils/generateAccessToken.js';

export const registration = async (req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()){
            return res.status(400).json({errors: result.array()})
        }
        const {
            firstName, 
            lastName,
            email,
            login,
            password,
            location,
            avatar
        } = req.body;

        // const candidate = await User.findOne({login});

        // if (candidate) {
        //     return res.status(400).json({message: 'user was created'})
        // }

        const hashedPassword = createHashPassword(password);
        const newUser = new User({
            firstName, 
            lastName,
            email,
            login,
            password: hashedPassword,
            location,
            avatar
        });
        const createdUser = await newUser.save();
        res.status(201).json(createdUser)
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const login = async (req, res) => {
    try {
        const {login, password} = req.body;
        const user = await User.findOne({login});
        if(!user){
            return res.status(400).json({message: "user is not found, check your login"})
        }
        const isMatch = checkPassword(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: "wrong password"})
        }
        const token = generateAccessToken(user._id);
        res.status(200).json(token)
    } catch (error) {
        res.status(500).json("login error")
    }
}