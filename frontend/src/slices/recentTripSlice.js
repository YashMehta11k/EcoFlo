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
            const locPoints={
                start:"A",
                end:"B" 
            }
            
            const newTrip={...trip,bookTime:moment().format("HH:mm:ss"),bookDate:moment().format("YYYY-MM-DD"),tripDistance,locPoints}

            state.recentTrips=[...state.recentTrips,newTrip];
            localStorage.setItem('recentTrip',JSON.stringify(state));
        },

        removefromRecentTrip:(state,action)=>{
            state.recentTrips=state.recentTrips.filter((x)=>x._id!==action.payload);
            localStorage.setItem('recentTrip',JSON.stringify(state));
            
        },

        saveTravelProof: (state, action) => {
            const { tripId, proofUrl } = action.payload;
            const tripIndex = state.recentTrips.findIndex(trip => trip._id === tripId);
            if (tripIndex !== -1) {
                const bookTime = moment(state.recentTrips[tripIndex].bookTime, "HH:mm:ss");
                const currentTime = moment();
                const proofUploadTime = currentTime.diff(bookTime, 'hours', true); // Difference in hours
                state.recentTrips[tripIndex].travelProof = proofUrl;
                state.recentTrips[tripIndex].proofUploadTime = proofUploadTime;
                localStorage.setItem('recentTrip', JSON.stringify(state));
            }
        }
     },
});

export const{addtoRecentTrip,removefromRecentTrip,saveTravelProof}=recentTripSlice.actions;

export default recentTripSlice.reducer;