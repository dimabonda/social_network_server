import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token){
            return res.status(400).json('user is not authorized')
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decodedData)
        req.user = decodedData;
        next();
    } catch (error) {
        return res.status(500).json('something went wrong');
    }
}