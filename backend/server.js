import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB  from './config/db.js';
import cookieParser from 'cookie-parser';
import transportRoutes from './routes/transportRoutes.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import AWS from 'aws-sdk';
import fileUpload from 'express-fileupload';

const port=process.env.PORT || 5000;

connectDB();

const app=express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//cookie-middleware
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('API is running ....!')
});


//s3-upload
AWS.config.update({region:'ap-south-1'})
app.use(fileUpload({
    limits:{fileSize:50*1024*1024},
}))
const s3=new AWS.S3({
    credentials:{
        accessKeyId: process.env.S3_KEY,
        secretAccessKey : process.env.S3_SECRET,
    }
})
app.post('/upload', async (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    const file = req.files.file;
    const uploadParams = {
        Bucket: "travel-proof-upload",
        Key: file.name,
        Body: file.data,
        ContentType: file.mimetype,
        ACL: 'public-read'
    };

    try {
        const data = await s3.upload(uploadParams).promise();
        res.json({ imageUrl: data.Location });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


app.use('/api/transports',transportRoutes);
app.use('/api/users',userRoutes); 

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>console.log(`Server running on port ${port}`))