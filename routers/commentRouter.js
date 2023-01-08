const Router = require('express');
const router = new Router();
const commentController = require('../controllers/commentController')
const authMiddleware = require('../middlewares/authMiddleware');
 
router.get('/:postId', authMiddleware, commentController.getPostComments);
router.post('/create', authMiddleware, commentController.createPostComment);
router.put('/:commentId/update', authMiddleware, commentController.updatePostComment);


module.exports = router;