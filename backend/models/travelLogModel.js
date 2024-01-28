import mongoose from "mongoose";

const travelLogSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    travels:[{
        name:{type:String,required:true},
        image:{type:String,required:true},
        transport:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Product",
        },
    }],
    startpoint:{
        type:String,
        required:true,
    },
    destination:{
        type:String,
        required:true,
    },
    dateOfTravel:{
        type:Date,
        default:Date.now()
    },
    duration:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    verify:{
        status:{type:String},
        upload_time:{type:String},
        image:{type:String},
    },
    isVefified:{
        type:Boolean,
        default:false,
        required:true,
    }
},{
    timestamps:true,
});

const TravelLog=mongoose.model("TravelLog",travelLogSchema);
export default TravelLog;