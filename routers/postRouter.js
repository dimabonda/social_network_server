const Router = require('express');
const router = new Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', postController.getPosts);
router.get('/:userId/posts', postController.getUserPosts);

router.post('/create', authMiddleware, postController.createPost);
router.put('/:postId/update', authMiddleware, postController.updatePost);
router.put('/:postId/like', authMiddleware, postController.likePost);

module.exports = router;