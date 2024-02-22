import {TRANSPORT_URL} from '../constants';
import { apiSlice } from './apiSlice';

export const transportApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getTransports:builder.query({
            query: ({ keyword, weatherCompatible, sortBy }) => ({
                url: TRANSPORT_URL,
                params: {
                  keyword,
                  weatherCompatible,
                  sortBy,
                },
            }),
            providesTags: ['Transports'],
            keepUnusedDataFor: 5,
        }),
        getTransportDetails:builder.query({
            query:(transportId)=>({
                url:`${TRANSPORT_URL}/${transportId}`,
            }),
            keepUnusedDataFor:5,
        }),
        addTransport:builder.mutation({
            query:()=>({
                url:TRANSPORT_URL,
                method:'POST',
            }),
            invalidatesTags:[`Transport`],
        }),
        updateTransport:builder.mutation({
            query:(data)=>({
                url: `${TRANSPORT_URL}/${data._id}`,
                method:'PUT',
                body:data,
            }),
            invalidatesTags:['Transports'],
        }),
        deleteTransport:builder.mutation({
            query:(transportId)=>({
                url:`${TRANSPORT_URL}/${transportId}`,
                method:'DELETE',
            }),
        }),
        createReview:builder.mutation({
            query:(data)=>({
                url:`${TRANSPORT_URL}/${data.transportId}/reviews`,
                method:"POST",
                body:data,
            }),
            invalidatesTags:['Transport'],
        })
    }),
});

export const{useUpdateTransportMutation,useCreateReviewMutation,useDeleteTransportMutation,useGetTransportsQuery , useGetTransportDetailsQuery,useAddTransportMutation}=transportApiSlice;