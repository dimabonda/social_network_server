import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';
import postRouter from './routers/postRouter.js';
import commentRouter from './routers/commentRouter.js';
import fileRouter from './routers/fileRouter.js';


import { verifyToken } from './middlewares/verifyToken.js';

/*CONFIGURATIONS*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, "public/assets")))

/*ROUTES*/
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', verifyToken, postRouter);
app.use('/comment', commentRouter);
app.use('/upload', fileRouter)

/*MONGOOSE SETUP*/ 
const PORT = process.env.PORT || 6001;
const start = async() => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URL)
        app.listen(PORT, () => {
            console.log(`Server has been started on ${PORT} port`)
        })
    } catch (error) {
        console.log(error);
    }
}

start()  