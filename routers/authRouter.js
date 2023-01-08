const Router = require('express');
const authController = require('../controllers/authController');
const { check } = require('express-validator')
const router = new Router();

router.post('/registration',
    [
        check("login").notEmpty().withMessage("login can not be empty"),
        check("password").isLength({min: 4, max: 10}).withMessage("check password length").notEmpty().withMessage("password can not be empty"),
        check("email").isEmail().withMessage("enter correct email")
    ], 
    authController.registration);
router.post('/login', 
    [
        check('login').notEmpty().withMessage("login can not be empty"),
        check('password').notEmpty().withMessage("password cannot be empty")
    ],
    authController.login);

module.exports = router 