import asyncHandler from "../middleware/asyncHandler.js";
import Transport from "../models/transportModels.js";

// @desc fetch all transports
// @route GET /api/transports
// @access Public
const getTransport=asyncHandler(async(req,res)=>{
    const transports=await Transport.find({});
    res.json(transports);
});

// @desc fetch particular transport
// @route GET /api/transports/:id
// @access Public
const getTransportById=asyncHandler(async(req,res)=>{
    const transport=await Transport.findById(req.params.id);
    if(transport){
        return res.json(transport);
    }else{
        res.status(404);
        throw new Error("Transpot resourse not found");
    }
});

export {getTransport,getTransportById};