import mongoose, { Schema } from "mongoose";

const reviewSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    APPS:{
        type:String,
        required:true,
    },
    RATINGS:{
        type:Number,
        required:true,
    },
    COMMENTS:{
        type:String,
        required:true,
    },
},{
    timestamps:true,
});
const transportSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    APPS:{
        type:String,
        required:true,
    },
    AVG_SPEED:{
        type:Number,
        required:true,
    },
    CARBON_INDEX_PER_KM:{
        type:Number,
        required:true,
    },
    CONTACT_NUMBER:{
        type:String,
        required:true,
    },
    COST_PER_KM:{
        type:Number,
        required:true,
    },
    GREEN_POWER:{
        type:Boolean,
        required:true,
    },
    IMAGES:{
        type:String,
        required:true,
    },
    LINK:{
        type:String,
        required:true,
    },
    MODE_OF_TRANSPORT:{
        type:String,
        required:true,
    },
    REVIEWS:[reviewSchema],
    NUM_REVIEWS:{
        type:Number,
        required:true,
    },
    NUMBER_OF_SEATS:{
        type:Number,
        required:true,
    },
    RATINGS:{
        type:Number,
        required:true,
    },
    REWARD_POINTS:{
        type:Number,
        required:true,
    },
    WEATHER:{
        type:Boolean,
        required:true,
    },
},{
    timestamps: true,
});

const Transport =mongoose.model("Transport",transportSchema);
export default Transport;