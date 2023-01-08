const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const helmet = require('helmet');
const path = require('path');
const dotenv = require('dotenv');

const authRouter = require('./routers/authRouter');
const postRouter = require('./routers/postRouter');
const commentRouter = require('./routers/commentRouter')

const authMiddleware = require('./middlewares/authMiddleware');
const { body } = require('express-validator');

/*CONFIGURATIONS*/
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



/*FILE STORAGE*/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage});

/*ROUTES*/
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);

app.post('/uploadpost', upload.single('picture'), (req, res) => {
    // res.json(req)
    console.log(req.file)
    res.json(req.body.picturePath)
})

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