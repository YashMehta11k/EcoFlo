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
        }),
        uploadTravelProof:builder.mutation({
            query:({tripId,details})=>({
                url:`${TRAVELLOG_URL}/${tripId}/upload`,
                method:'PUT',
                body:{...details},
            })
        })
    })
});

export const {useCreateTravelLogMutation,useGetTravelLogDetailsQuery,useUploadTravelProofMutation}=travelLogApiSlice ;