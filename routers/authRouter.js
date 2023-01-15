import Router from 'express';
import { 
        registration,
        login
    } from '../controllers/authController.js';
import { check } from 'express-validator';
const router = new Router();

router.post('/registration',
    [
        check("login").notEmpty().withMessage("login can not be empty"),
        check("password").isLength({min: 4, max: 10}).withMessage("check password length").notEmpty().withMessage("password can not be empty"),
        check("email").isEmail().withMessage("enter correct email")
    ], 
    registration);
router.post('/login', 
    [
        check('login').notEmpty().withMessage("login can not be empty"),
        check('password').notEmpty().withMessage("password cannot be empty")
    ],
    login);
export default router;