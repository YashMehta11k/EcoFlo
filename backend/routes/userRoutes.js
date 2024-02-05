import express from 'express';
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUsers,
    getUsersById,
    updateUser
} from '../controllers/userController.js';

const router=express.Router();

router.route('/').post(registerUser).get(getUsers);
router.post('/logout',logoutUser);
router.post('/login',authUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.route('/:id').delete(deleteUsers).get(getUsersById).put(updateUser);




export default router;

