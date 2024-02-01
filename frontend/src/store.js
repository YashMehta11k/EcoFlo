import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import recentTripSliceReducer from "./slices/recentTripSlice";

const store =configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        recentTrip:recentTripSliceReducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
});

export default store;