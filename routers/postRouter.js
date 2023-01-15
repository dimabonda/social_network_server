import Router from 'express';
import {
        getPosts,
        getUserPosts, 
        createPost, 
        updatePost,
        likePost
    } from '../controllers/postController.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { upload } from '../utils/storage.js';

const router = new Router();

router.get('/', getPosts);
router.get('/:userId/posts', getUserPosts);

router.post('/create', verifyToken, upload.single('file'), createPost);
router.put('/:postId/update', verifyToken, updatePost);
router.put('/:postId/like', verifyToken, likePost);

export default router;