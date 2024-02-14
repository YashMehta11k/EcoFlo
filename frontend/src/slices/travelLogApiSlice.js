import {apiSlice} from './apiSlice';
import {TRAVELLOG_URL} from '../constants';

export const travelLogApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createTravelLog:builder.mutation({
            query:(trip)=>({
                url:TRAVELLOG_URL,
                method:'POST',
                body:{...trip}
            })
        })
    })
});

export const {useCreateTravelLogMutation}=travelLogApiSlice ;