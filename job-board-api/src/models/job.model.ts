import mongoose from 'mongoose';

import { Ijob } from '../types';

const jobSchema = new mongoose.Schema<Ijob>({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    company:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
        
    },
    status:{
        type:String,
        enum:['open','close'],
        default:'open'
    },
    
    
},{timestamps:true})

const Job =  mongoose.model<Ijob>('Job',jobSchema);

export default Job