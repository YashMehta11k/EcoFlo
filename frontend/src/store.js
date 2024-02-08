import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import recentTripSliceReducer from "./slices/recentTripSlice";
import authSliceReducer from "./slices/authSlice";

const store =configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        recentTrip:recentTripSliceReducer,
        auth:authSliceReducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
});

export default store;