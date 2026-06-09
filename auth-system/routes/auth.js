require('dotenv').config();
const express = require('express');
const { requireAuth, requireRole } = require('../middleware/auth');
const { error } = require('console');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
// POST /auth/register

router.post('/register',async (req,res,next)=>{
    try{
        const {name,email,password}=req.body;
        
        if(!name || !email || !password) return res.status(401).json({
            error:"All fields must be given"
        })
        
        const existingUser = await User.findOne({email});
        
        if(existingUser) return res.status(401).json({
            error:"User and Email is Already Registered"
        })
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
        })
        res.status(201).json({message:"User is Registered Successfully"});
    }catch(err){
        next(err);
    }
})

// POST /auth/login

router.post('/login',requireAuth,async (req,res,next)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password) return res.status(401).json({error:"All fields Required"});
        
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" })
        }
        
        const isMatch = await bcrypt.compare(password,user.password);
        
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" })
        }
        
        const token = jwt.sign({
            id:user._id , role:user.role
        },process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
        console.log(token);
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        
        res.json({ message: "Login successful!" ,token})
        
        
    }catch(err){
        next(err);
    }
})

// GET /auth/profile

router.get('/profile',requireAuth,async (req,res)=>{
    const user = await User.findById(req.user.id).select('-password')
    res.json({ user })
  })
// GET /auth/admin
router.get('/admin',requireAuth,requireRole('admin'),(req,res)=>{
    res.json({message:"Wellcome Admin"});
})  

// GET /auth/users

router.get('/admin',requireAuth,requireRole('admin'), async (req,res)=>{
    const users = await User.find({}).select('-password');
    res.json({users})
}) 

module.exports = router;