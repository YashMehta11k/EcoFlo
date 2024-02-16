import moment from 'moment-timezone';
import asyncHandler from '../middleware/asyncHandler.js';
import TravelLog from '../models/travelLogModel.js';
moment.tz.setDefault("Asia/Kolkata");

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
    const Trips=await TravelLog.find({user:req.user._id});
    res.status(200).json(Trips);
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
//@route PUT/api/travelLog/:id/upload
//@access Private
const updateTripToProofUploaded=asyncHandler(async (req,res) => {
    
    try {
        const {travelProof}=req.body;
        const trip = await TravelLog.findById(req.params.id);
        if (!trip) {
            res.status(404);
            throw new Error('Trip not found');
        }else{
            trip.proofStatus = 'Uploaded';
            trip.proofUploadTime = moment(); // Set proof upload time
            trip.travelProof = travelProof; // Set travel proof URL
            const updatedTrip =await trip.save();

            res.status(200).json(updatedTrip);
        }

    } catch (error) {
        console.error('Error updating trip:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
})

//@desc Update trip to Verified
//@route PUT/api/travelLog/:id/verify
//@access Private/Admin
const updateTripToVerified=asyncHandler(async (req,res) => {

})

//@desc Update trip to Verified
//@route PUT/api/travelLog/:id/verify
//@access Private/Admin
const updateTripToApproved=asyncHandler(async (req,res) => {
    res.send('Update trips to Approved');
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
    updateTripToApproved,
    getTravelLog,
    getMyTravelLog
};



