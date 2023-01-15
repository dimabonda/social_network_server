export const uploadFile = async(req, res) => {
    try {
        const picturePath = req.file.filename;
        res.status(200).json(picturePath)
    } catch (error) {
        res.status(400).json(error.message)
    }
} 