import Post from '../models/Post.js';

export const getPosts = async (req, res) => {
    try {
        const {
            limit=10,
            skip=0
        } = req.query;

        const posts = await Post.find(null, null, {limit, skip})
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const getUserPosts = async (req, res) => {
    try {
        const {
            limit=10,
            skip=0
        } = req.query;

        const posts = await Post.find({owner: req.params.userId}, null, {limit, skip})
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const createPost = async (req, res) => {
    try {
        const {
            title,
            description,
            // picturePath
        } = req.body;
        const picturePath = req.file?.filename;


        const post = new Post({
            title,
            description,
            picturePath,
            owner: req.user.id,
            comments: [],
            likes: []
        })

        const createdPost = await post.save();
        res.status(200).json(createdPost);
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const updatePost = async (req,res) => {
    try {
        const {postId} = req.params
        const post = await Post.findById(postId);
        if(post.owner != req.user.id){
            res.status(400).json('не ваш пост')
        }
        const updatedPost = await Post.findByIdAndUpdate(postId, {...req.body}, {new: true}) 
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const likePost = async (req, res) => {
    try {
        const {postId} = req.params;
        const {id: userId} = req.user;
        
        let {likes} = await Post.findById(postId);
        if (likes.includes(userId)){
            likes = likes.filter(like => like != userId)
        } else {
            likes.push(userId)
        }
        const updatedPost = await Post.findByIdAndUpdate(postId, {likes}, {new: true})
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(400).json(error.message)
    }
}