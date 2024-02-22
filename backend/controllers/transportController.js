import asyncHandler from "../middleware/asyncHandler.js";
import Transport from "../models/transportModels.js";

//@desc fetch all transport
//@route GET/api/transport
//@access Public
const getTransport=asyncHandler(async(req,res)=>{
    try {
        let filters = {};
        if (req.query.keyword) {
            const keywordRegex = new RegExp(req.query.keyword, 'i');
            filters = {
            $or: [
                { APPS: keywordRegex }, // Search by name
                { MODE_OF_TRANSPORT: keywordRegex } // Search by mode of transport
            ]
            };
        }
        if (req.query.weatherCompatible === 'true') {
          filters.WEATHER = true;
        }
        const transports = await Transport.find({...filters});
    
        if (req.query.sortBy === 'cost') {
          transports.sort((a, b) => a.COST_PER_KM - b.COST_PER_KM);
        } else if (req.query.sortBy === 'emission') {
          transports.sort((a, b) => a.CARBON_INDEX_PER_KM - b.CARBON_INDEX_PER_KM);
        } else if (req.query.sortBy === 'points') {
          transports.sort((a, b) => b.POINTS_REWARDS - a.POINTS_REWARDS);
        } else if (req.query.sortBy === 'points') {
            transports.sort((a, b) => b.AVG_SPEED - a.AVG_SPEED);
        }
    
        res.json(transports);
      } catch (error) {
        res.status(500).json({ message: 'Server Error' });
      }
});

const getTransportById=asyncHandler(async(req,res)=>{
    const transport=await Transport.findById(req.params.id);
    if(transport){
        return res.json(transport);
    }else{
        res.status(404);
        throw new Error("Transport resourse not found");
    }
});

//@desc create transport
//@route POST/api/transport
//@access Private/Admin
const addTransport=asyncHandler(async(req,res)=>{
    try{
        const transport=new Transport({
            APPS: 'Sample App',
            CONTACT_NUMBER: '9876543210',
            MODE_OF_TRANSPORT: 'Sample Mode',
            CARBON_INDEX_PER_KM: 0,
            REWARD_POINTS: 0,
            WEATHER: false,
            AVG_SPEED: 0,
            COST_PER_KM: 0,
            NUMBER_OF_SEATS: 0,
            LINK: 'Sample Link',
            IMAGES: '/images/sample.png',
            GREEN_POWER: false,
            RATINGS: 0.0,
            NUM_REVIEWS: 0
        })
    
        const createdTransport=await transport.save();
        res.status(201).json(createdTransport);
    }catch(error){
        console.log(error)
    }
});

//@desc fetch all transport
//@route PUT/api/transport/:id
//@access Private/Admin
const updateTransport=asyncHandler(async(req,res)=>{

    try{
        const {APPS,CONTACT_NUMBER,MODE_OF_TRANSPORT,CARBON_INDEX_PER_KM,REWARD_POINTS,WEATHER,AVG_SPEED,COST_PER_KM,NUMBER_OF_SEATS,LINK,IMAGES,GREEN_POWER,RATINGS,NUM_REVIEWS}=req.body;
        const transport=await Transport.findById(req.params.id);
        if(transport){
            transport.APPS=APPS;
            transport.CONTACT_NUMBER = CONTACT_NUMBER;
            transport.MODE_OF_TRANSPORT = MODE_OF_TRANSPORT;
            transport.CARBON_INDEX_PER_KM=parseInt(CARBON_INDEX_PER_KM);
            transport.REWARD_POINTS=parseInt(REWARD_POINTS);
            transport.WEATHER=Boolean(WEATHER);
            transport.RATINGS=parseInt(RATINGS);
            transport.AVG_SPEED=parseInt(AVG_SPEED);
            transport.COST_PER_KM=parseInt(COST_PER_KM);
            transport.LINK=LINK;
            transport.NUMBER_OF_SEATS=parseInt(NUMBER_OF_SEATS);
            transport.IMAGES=IMAGES;
            transport.GREEN_POWER=Boolean(GREEN_POWER);
            transport.NUM_REVIEWS=parseInt(NUM_REVIEWS);


            const updateTransport=await transport.save();
            res.json(updateTransport);
        }else{
            res.status(404);
            throw new Error('Transport not found');
        }
    }catch(error){
        res.status(404);
        console.log(error.message);
    }
});

//@desc delete a transport
//@route DELETE/api/transport/:id
//@access Private/Admin
const deleteTransport=asyncHandler(async(req,res)=>{

    try{
        const transport=await Transport.findById(req.params.id);
        if(transport){
            await Transport.deleteOne({_id:transport._id});
            res.status(200).json({Message:"Deleted Successfully"})
            
        }else{
            res.status(404);
            throw new Error('Transport not found');
        }
    }catch(error){
        res.status(404);
        console.log(error.message);
    }
});

//@desc create a review
//@route POST/api/transport/:id/reviews
//@access Private
const createTransportReview=asyncHandler(async(req,res)=>{
    const {rating,comment}=req.body;
    try{
        const transport=await Transport.findById(req.params.id);
        const alreadyReviewed=transport.REVIEWS.find((review)=>review.user.toString===req.user._id.toString());
        if(alreadyReviewed){
            res.status(400);
            throw new Error('Transport already reviewed');
        }
        const review={
            APPS:req.user.name,
            RATINGS:Number(rating),
            COMMENTS:comment,
            user:req.user._id
        };
        transport.REVIEWS.push(review);
        transport.NUM_REVIEWS=transport.REVIEWS.length+transport.NUM_REVIEWS;
        transport.RATINGS=transport.REVIEWS.reduce((acc,review)=>acc+review.RATINGS,0)/transport.REVIEWS.length;

        await transport.save();
        res.status(201).json({message:'Review Added'});
    }catch(error){
        res.status(404);
        console.log(error.message);
    }
});

export {getTransport,deleteTransport,getTransportById,updateTransport,addTransport,createTransportReview};