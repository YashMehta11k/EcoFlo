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
        }),
        getTravelLogDetails:builder.query({
            query:(tripId)=>({
                url:`${TRAVELLOG_URL}/${tripId}`
            }),
            keepUnusedDataFor:5
        })
    })
});

export const {useCreateTravelLogMutation,useGetTravelLogDetailsQuery}=travelLogApiSlice ;