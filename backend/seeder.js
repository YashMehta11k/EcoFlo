import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import transports from "./data/Bengaluru_transports.js";
import User from "./models/userModel.js";
import Transport from "./models/transportModels.js";
import TravelLog from "./models/travelLogModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData=async()=>{
    try{
        await TravelLog.deleteMany();
        await Transport.deleteMany();
        await User.deleteMany();

        const createUsers=await User.insertMany(users);

        const adminUser=createUsers[0]._id;

        const sampleTransports=transports.map((transport)=>{
            return {...transport, user:adminUser};
        });

        await Transport.insertMany(sampleTransports);

        console.log('Data Imported!'.green.inverse);
        process.exit();

    }catch(error){
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData=async()=>{
    try{
        await TravelLog.deleteMany();
        await Transport.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed'.red.inverse);
        process.exit();
        
    }catch(error){
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

if(process.argv[2]==='-d'){
    destroyData();
}else{
    importData();
}


