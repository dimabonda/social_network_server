const User = require('../models/User');
const createHashPassword = require('../utils/createHashPassword');
const checkPassword = require('../utils/checkPassword');
const { validationResult } = require('express-validator');
const generateAccessToken = require('../utils/generateAccessToken');


class AuthController {
    async registration (req, res) {
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
                location
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
                location
            });
            const createdUser = await newUser.save();
            res.status(200).json(createdUser)
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

    async login (req, res){
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
}

module.exports = new AuthController()