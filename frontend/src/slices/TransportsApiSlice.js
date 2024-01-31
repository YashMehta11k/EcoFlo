import {TRANSPORT_URL} from '../constants';
import { apiSlice } from './apiSlice';

export const transportApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getTransports:builder.query({
            query:()=>({
                url:TRANSPORT_URL,
            }),
            keepUnusedDataFor:5
        }),
        getTransportDetails:builder.query({
            query:(transportId)=>({
                url:`${TRANSPORT_URL}/${transportId}`,
            }),
            keepUnusedDataFor:5,
        })
    }),
});

export const{useGetTransportsQuery , useGetTransportDetailsQuery}=transportApiSlice;