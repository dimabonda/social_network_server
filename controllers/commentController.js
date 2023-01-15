import Comment from '../models/Comment.js';

export const getPostComments = async (req, res) => {
    try {
        const {postId} = req.params;
        const comments = await Comment.find({post: postId, parentComment: null});
        res.status(200).json(comments)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const createPostComment = async (req, res) => {
    try {
        const {id: userId} = req.user;
        const {text, postId, parentComment = null} = req.body;
        const comment = new Comment({
            owner: userId,
            post: postId,
            text,
            parentComment
        })
        const createdComment = await comment.save();
        res.status(200).json(createdComment);
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const updatePostComment = async (req, res) => {
    try {
        const {commentId} = req.params;
        const updatedComment = await Comment.findByIdAndUpdate(commentId, {...req.body}, {new: true})
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(400).json(error.message)
    }
}
