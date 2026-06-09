require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {requireAuth ,requireRole}= require('../middleware/auth')
//Register

router.post('/register',async(req,res,next)=>{
    try{
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({ error: "All fields required" });
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ error: "User Already Exists" })
        }

        //hash and store info

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password:hashedPassword,
        })
        res.status(201).json({message:"User is Registered Successfully"});
    }catch(err){
        next(err)
    }

    

})
//Login
router.post('/login', async (req, res, next) => {
    try {
      const { email, password } = req.body
  
      // Find user by email
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" })
      }
      
      // Compare password with hash
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" })
      }
      //generate the jwt

      const token = jwt.sign({
        id: user._id, role: user.role
      },process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});

      
      const decoded = jwt.verify(token,process.env.JWT_SECRET);
      
      res.json({ message: "Login successful!" ,token})
    } catch(err) {
      next(err)
    }
  })

  router.get('/profile',requireAuth,async (req,res)=>{
    const user = await User.findById(req.user.id).select('-password')
    res.json({ user })
  })
  // Only admins
  router.delete('/users/:id', requireAuth, requireRole('admin'), (req, res) => {
    res.json({ message: "User deleted!" })
  })
  
  // Admins OR moderators
  router.put('/posts/:id', requireAuth, requireRole('admin', 'moderator'), (req, res) => {
    res.json({ message: "Post updated!" })
  })

  router.get('/admin',requireAuth,requireRole('admin'),(req,res)=>{
    res.status(200).json({
      message:"Welcome Admin"
    })
  })
module.exports=router