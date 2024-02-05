import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB  from './config/db.js';
import transportRoutes from './routes/transportRoutes.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';

const port=process.env.PORT || 5000;

connectDB();

const app=express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send('API is running ....!')
});

app.use('/api/transports',transportRoutes);
app.use('/api/users',userRoutes); 

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>console.log(`Server running on port ${port}`))