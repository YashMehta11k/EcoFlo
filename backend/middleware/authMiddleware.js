import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

const protect=asyncHandler(async(req,res,next)=>{ //to protect the routes
    let token;
    //read the jwt from the website
    token=req.cookies.jwt;
    if(token){
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await User.findById(decoded.userId).select('-password');
            next();
        }catch(error){
            console.log(error);
            res.status(401);
            throw new  Error('Not Authorized -- token failed');
        }
    }else{
        res.status(401);
        throw new  Error('Not Authorized -- no token');//if there is no token sent by the user then it will send
    }
})

//Admin middleware
const admin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401);
        throw new Error("You don't have Admin Access");
    }
}

export {protect,admin};