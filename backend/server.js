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
        accessKeyId: "AKIA5SKFQT32UWA3NCEE",
        secretAccessKey : "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",
    }
})
app.post('/upload',async({files},res)=>{
    const uploadParams={
        Bucket:"travel-proof-upload",
        Key:files.file.name,
        Body:Buffer.from(files.file.data),
        ContentType:files.file.mimetype,
        ACL:'public-read'
    }

    s3.upload(uploadParams,function(err,data){
        err && console.log("Error",err)
        data && console.log("Upload Successfull",data.Location)
    })

    res.send('OK')
})


app.use('/api/transports',transportRoutes);
app.use('/api/users',userRoutes); 

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>console.log(`Server running on port ${port}`))