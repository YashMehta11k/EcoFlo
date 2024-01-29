import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB  from './config/db.js';
import transportRoutes from './routes/transportRoutes.js';

const port=process.env.PORT || 5000;

connectDB();

const app=express();
app.get('/',(req,res)=>{
    res.send('API is running ....!')
});

app.use('/api/transports',transportRoutes)

app.listen(port,()=>console.log(`Server running on port ${port}`))