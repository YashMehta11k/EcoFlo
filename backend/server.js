import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import transports from './data/transports.js';
const port=process.env.PORT || 5000;
const app=express();
app.get('/',(req,res)=>{
    res.send('API is running ....!')
});

app.get('/api/transports',(req,res)=>{
    res.json(transports);
})

app.get('/api/transports/:APPS',(req,res)=>{
    const transport=transports.find((p)=>p.APPS===req.params.APPS);
    res.json(transport);
})

app.listen(port,()=>console.log(`Server running on port ${port}`))