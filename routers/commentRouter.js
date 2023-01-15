import Router from'express';
import {
        getPostComments, 
        createPostComment, 
        updatePostComment
    } from'../controllers/commentController.js';

const router = new Router();

router.get('/:postId', getPostComments);
router.post('/create', createPostComment);
router.put('/:commentId/update', updatePostComment);

export default router;