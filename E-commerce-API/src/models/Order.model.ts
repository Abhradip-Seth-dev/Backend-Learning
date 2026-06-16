import mongoose from 'mongoose';
import { Iorder } from '../types';

// Order    — customer (ref User), items[{ product (ref Product), quantity }], totalPrice, status (pending/shipped/delivered), createdAt
const orderSchema = new mongoose.Schema<Iorder>({
    customer:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    items:[{
        product:{
            type:mongoose.Types.ObjectId,
            ref:'Product'
        },
        quantity:{
            type:Number,
            required:true
        }

    }],
    totalPrice:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:['pending','shipped','delivered'],
        default:'pending'
    }
},{timestamps:true})

const Order = mongoose.model<Iorder>('Order',orderSchema);

export default Order 