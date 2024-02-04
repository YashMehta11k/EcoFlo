import {createSlice} from "@reduxjs/toolkit";
import moment from "moment-timezone";

moment.tz.setDefault("Asia/Kolkata");

const initialState=localStorage.getItem("recentTrip")?JSON.parse(localStorage.getItem("recentTrip")):{recentTrips:[]};

const recentTripSlice=createSlice({
    name:"recentTrip",
    initialState,
    reducers:{
        addtoRecentTrip:(state,action)=>{
            const trip=action.payload;
            const tripDistance=4;
            
            const newTrip={...trip,bookTime:moment().format("HH:mm:ss"),bookDate:moment().format("YYYY-MM-DD"),tripDistance}

            state.recentTrips=[...state.recentTrips,newTrip];
            localStorage.setItem('recentTrip',JSON.stringify(state));
        },

        removefromRecentTrip:(state,action)=>{
            state.recentTrips=state.recentTrips.filter((x)=>x._id!==action.payload);
            localStorage.setItem('recentTrip',JSON.stringify(state));
            
        }
    },
});

export const{addtoRecentTrip,removefromRecentTrip}=recentTripSlice.actions;

export default recentTripSlice.reducer;