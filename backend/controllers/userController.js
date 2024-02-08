import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateTokens from '../utils/generateTokens.js';

//@desc Auth user and get token
//@route POST/api/users/login
//@access Public

const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email})
    if(user  && ( await user.matchPassword(password))){
        generateTokens(res,user._id);
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        });
    }else{
        res.status(401);
        throw new Error('Invalid Email or Password');
    }
});

//@desc Register user and get token
//@route POST/api/users
//@access Public

const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;
    const userExists=await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    const user=await User.create({
        name,
        email,
        password,
    });

    if(user){
        generateTokens(res,user._id);
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        });
    }else{
        res.status(400);
        throw new  Error('Invalid user data');
    }

});

//@desc Logout user and clear cookie
//@route POST/api/users/logout
//@access Private

const logoutUser=asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0),
    });
    res.status(200).json({message:'Logged out Succesfully'});
});

//@desc get user profile
//@route GET/api/users/profile
//@access Public

const getUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id);

    if(user){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        });
    }else{
        res.status(404);
        throw new Error("User not found");
    }
});

//@desc Update user profile
//@route PUT/api/users/profile
//@access Private

const updateUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id);
    if(user){
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;

        if(req.body.password){
            user.password=req.body.password;
        }

        const updateUser=await user.save();
        res.status(200).json({
            _id:updateUser._id,
            name:updateUser.name,
            email:updateUser.email,
            isAdmin:updateUser.isAdmin
        });
    }else{
        res.status(404);
        throw new Error("User not found");
    }
});

//@desc get users
//@route GET/api/users
//@access Admin
const getUsers=asyncHandler(async(req,res)=>{
    res.send('get users');
});

//@desc delete users
//@route DELETE/api/users/:id
//@access Admin
const deleteUsers=asyncHandler(async(req,res)=>{
    res.send('delete users');
});

//@desc get users by id
//@route GET/api/users/:id
//@access Admin
const getUsersById=asyncHandler(async(req,res)=>{
    res.send('get users by id');
});

//@desc update user
//@route PUT/api/users/:id
//@access Admin
const updateUser=asyncHandler(async(req,res)=>{
    res.send('update user');
});

export{
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUsers,
    getUsersById,
    updateUser
}

