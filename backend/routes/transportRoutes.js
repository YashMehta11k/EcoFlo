import express from 'express';
//import transports from '../data/Bengaluru_transports.js';
import asyncHandler from '../middleware/asyncHandler.js';
import Transport from '../models/transportModels.js';

const router=express.Router();

router.get('/',asyncHandler(async (req,res)=>{
    const transports=await Transport.find({});
    res.json(transports);
}));

router.get('/:id',asyncHandler(async(req,res)=>{
    const transport=await Transport.findById(req.params.id);
    if(transport){
        res.json(transport);
    }else{
        res.status(404);
        throw new Error('Transport Resourse not found');
    }
}));

export default router;

