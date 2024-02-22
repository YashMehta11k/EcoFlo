import {createSlice} from "@reduxjs/toolkit";
import moment from "moment-timezone";

moment.tz.setDefault("Asia/Kolkata");

const initialState=localStorage.getItem("recentTrip")?JSON.parse(localStorage.getItem("recentTrip")):{recentTrips:[]};


const recentTripSlice=createSlice({
    name:"recentTrip",
    initialState,
    reducers:{
        addtoRecentTrip:(state,action)=>{
            const {user,...trip}=action.payload;
            const locData = JSON.parse(localStorage.getItem('locData'));
            const tripDistance=locData?locData.distance:4;
            const locPoints={
                start:locData?locData.origin:"A",
                end:locData?locData.destination:"B" 
            }
            const confirmStatus='not comfirmed';
            const proofStatus='not uploaded';
            const verifyStatus='not verified';
            const approveStatus='pending';
            const review='example';
            const travelProof='url';
            const adminProofReview='';
            const proofUploadTime=moment();
            const newTrip={...trip,user,bookTime:moment().format("HH:mm:ss"),bookDate:moment().format("YYYY-MM-DD"),tripDistance,locPoints,confirmStatus,proofStatus,review,travelProof,proofUploadTime,verifyStatus,approveStatus,confirmedAt:moment(),adminProofReview}

            state.recentTrips=[...state.recentTrips,newTrip];
            localStorage.setItem('recentTrip',JSON.stringify(state));
        },

        removefromRecentTrip:(state,action)=>{
            state.recentTrips=state.recentTrips.filter((x)=>x._id!==action.payload);
            localStorage.setItem('recentTrip',JSON.stringify(state));
            
        },
        removeConfirmedTrip: (state, action) => {
            const { tripId } = action.payload;
            const recentTrips = localStorage.getItem("recentTrip")
                ? JSON.parse(localStorage.getItem("recentTrip")).recentTrips
                : [];
            const updatedRecentTrips = recentTrips.filter((trip) => trip._id !== tripId);
            localStorage.setItem("recentTrip", JSON.stringify({ recentTrips: updatedRecentTrips }));
        },

        saveTravelProof: (state, action) => {
            const { tripId, proofUrl } = action.payload;
            const tripIndex = state.recentTrips.findIndex(trip => trip._id === tripId);
            if (tripIndex !== -1) {
                const bookTime = moment(state.recentTrips[tripIndex].bookTime, "HH:mm:ss");
                const currentTime = moment();
                const proofUploadTime = currentTime.diff(bookTime, 'hours', true); // Difference in hours
                state.recentTrips[tripIndex].travelProof = proofUrl;
                state.recentTrips[tripIndex].proofStatus='uploaded';
                state.recentTrips[tripIndex].proofUploadTime = proofUploadTime;
                localStorage.setItem('recentTrip', JSON.stringify(state));
            }
        },
        resetTrips:(state)=>(state=initialState)
     },
});

export const{resetTrips,addtoRecentTrip,removefromRecentTrip,removeConfirmedTrip,saveTravelProof}=recentTripSlice.actions;

export default recentTripSlice.reducer;