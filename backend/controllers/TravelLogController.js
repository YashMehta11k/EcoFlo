import asyncHandler from '../middleware/asyncHandler.js';
import TravelLog from '../models/travelLogModel.js';

//@desc Create new Travel Log
//@route POST/api/travelLog
//@access Private
const addTrips=asyncHandler(async(req,res)=>{
    const {
        transport,
        user,
        APPS,
        CARBON_INDEX_PER_KM,
        GREEN_POWER,
        MODE_OF_TRANSPORT,
        REWARD_POINTS,
        locPoints,
        bookTime,
        bookDate,
        tripDistance,
        confirmStatus,
        proofStatus,
        review,
        travelProof,
        proofUploadTime,
        verifyStatus,
        approveStatus,
        confirmedAt,
        adminProofReview
    } = req.body;

    try {
        const newTrip = new TravelLog({ // Assuming you have user authentication and req.user contains user details
            transport,
            user, // You need to populate this with the corresponding transport ObjectId
            APPS,
            CARBON_INDEX_PER_KM,
            GREEN_POWER,
            MODE_OF_TRANSPORT,
            REWARD_POINTS,
            locPoints,
            bookTime,
            bookDate,
            tripDistance,
            confirmStatus,
            proofStatus,
            review,
            travelProof,
            proofUploadTime,
            verifyStatus,
            approveStatus,
            confirmedAt,
            adminProofReview
    });

        const createdTrip = await newTrip.save();
        res.status(201).json(createdTrip);
    } catch (error) {
        console.error('Error creating new trip:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

//@desc Get logged in user's TravelLog
//@route GET/api/travelLog/myTrips
//@access Private
const getMyTravelLog=asyncHandler(async (req,res) => {
    const Trip=await TravelLog.find({user:req.user._id});
    res.status(200).json(Trip);
});

//@desc Get TravelLog by Id
//@route GET/api/travelLog/:id
//@access Private
const getTravelLogById=asyncHandler(async (req,res) => {
    const trip=await TravelLog.findById(req.params.id).populate('user','name email');
    if(trip){
        res.status(200).json(trip);
    }else{
        res.status(404);
        throw new Error('Trip not found');
    }
});

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



