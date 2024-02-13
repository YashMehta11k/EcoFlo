import asyncHandler from '../middleware/asyncHandler.js';
import TravelLog from '../models/travelLogModel.js';

//@desc Create new Travel Log
//@route POST/api/travelLog
//@access Private
const addTrips=asyncHandler(async(req,res)=>{
    res.send('add Confirmed Trips');
})

//@desc Get logged in user's TravelLog
//@route GET/api/travelLog/myTrips
//@access Private
const getMyTravelLog=asyncHandler(async (req,res) => {
    res.send('get Trips by the User logged in');
})

//@desc Get TravelLog by Id
//@route GET/api/travelLog/:id
//@access Private
const getTravelLogById=asyncHandler(async (req,res) => {
    res.send('get Trips by Id');
})

//@desc Update trip to proof uploaded
//@route GET/api/travelLog/:id/upload
//@access Private/Admin
const updateTripToProofUploaded=asyncHandler(async (req,res) => {
    res.send('Update trips to proof uploaded');
})

//@desc Update trip to Verified
//@route GET/api/travelLog/:id/verify
//@access Private/Admin
const updateTripToVerified=asyncHandler(async (req,res) => {
    res.send('Update trips to verified');
})

//@desc Get all trips
//@route GET/api/travelLog
//@access Private/Admin
const getTravelLog=asyncHandler(async (req,res) => {
    res.send('Get all trips');
})




export{
    addTrips,
    getTravelLogById,
    updateTripToProofUploaded,
    updateTripToVerified,
    getTravelLog,
    getMyTravelLog
};



