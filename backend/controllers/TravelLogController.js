import asyncHandler from '../middleware/asyncHandler.js';
import TravelLog from '../models/travelLogModel.js';

//@desc Create new Travel Log
//@route POST/api/travelLog
//@access Private

const addTrips=asyncHandler(async(req,res)=>{
    res.send('add Confirmed Trips')
})