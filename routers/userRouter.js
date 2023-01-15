import Router from 'express'
import {
    getUser,
    getUserFriends,
    addRemoveFriends
} from '../controllers/userController.js'
const router = new Router();

router.get('/:userId', getUser);
router.get('/:userId/friends', getUserFriends);

router.patch('/:userId/:friendId', addRemoveFriends);

export default router