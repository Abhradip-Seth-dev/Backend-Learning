// Product  — name, description, price, stock, createdAt

import mongoose from 'mongoose';
import { Iproduct } from '../types';

const productSchema = new mongoose.Schema<Iproduct>({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
    },
},{timestamps:true})

const Product = mongoose.model<Iproduct>('Product',productSchema);

export default Product 