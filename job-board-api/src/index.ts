import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import dotenv from 'dotenv'
import {errorHandler} from './middleware/error.middleware'
import authRoutes from './routes/auth.routes'
dotenv.config();
const app = express();

const PORT = process.env.PORT

app.use(express.json());
app.use(morgan('dev'))

app.use('/api/auth', authRoutes)

app.use(errorHandler)

mongoose.connect(process.env.MONGO_URI as string).then(()=>{
    console.log('MongoDB connected');
    app.listen(PORT,()=>{
        console.log('Server is running ');
        
    })
    
}).catch((err)=>{
    console.log('DB connection Failed',err);
    
})