import mongoose, { Mongoose } from "mongoose";



export interface Iuser{
    name:string,
    email:string,
    password:string,
    role:'admin'|'customer',
}
export interface Iproduct{
    name:string,
    description:string,
    stock:Number,
    price:Number
}
export interface Iorder{
    customer:mongoose.Types.ObjectId,
    items:{
        product:mongoose.Types.ObjectId,
        quantity:Number,
    }[],
    totalPrice:Number,
    status:'pending'|'shipped'|'delivered',
}
