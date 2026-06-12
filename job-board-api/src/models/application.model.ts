import mongoose from "mongoose";
import { Iapplication } from "../types";

const applicationSchema = new mongoose.Schema<Iapplication>({
    candidate:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    job:{
        type:mongoose.Types.ObjectId,
        ref:'Job',
        required:true
    },
    status:{
        type:String,
        enum:['pending','approved','rejected'],
        default:'pending'
    },
    
},{timestamps:true})

const Apllication = mongoose.model<Iapplication>('Application',applicationSchema);