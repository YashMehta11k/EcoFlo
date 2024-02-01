import {createSlice} from "@reduxjs/toolkit";

const initialState=localStorage.getItem("recentTrip")?JSON.parse(localStorage.getItem("recentTrip")):{recentTrips:[]};

const recentTripSlice=createSlice({
    name:"recentTrip",
    initialState,
    reducers:{
        addtoRecentTrip:(state,action)=>{
            const trip=action.payload;
            state.recentTrips=[...state.recentTrips,trip];

            //state.tripCO2=state.recentTrips.reduce((acc,trip)=>acc+trip.CARBON_INDEX_PER_KM*5,0);

            localStorage.setItem('recentTrip',JSON.stringify(state));
        }
    },
});

export const{addtoRecentTrip}=recentTripSlice.actions;

export default recentTripSlice.reducer;