import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await User.findById(userId);
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await User.findById(userId);
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        res.status(200).json(friends)
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const addRemoveFriends = async (req, res) => {
    try {
        const {userId, friendId} = req.params;
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);
        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter( id => id !== friendId);
            friend.friends = friend.friends.filter( id => id !== userId)
        } else {
            user.friends.push(friendId);
            friend.friends.push(userId);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        res.status(200).json(friends)
        
    } catch (error) {
        res.status(400).json(error.message)
    }
} 


