const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET    /users
router.get('/',async (req,res,next)=>{
    try{
        const users = await User.find().select('name email adress createdAt');
        res.status(200).json({users});
    }catch(err){
        next();
    }
})
// GET    /users/:id
router.get('/:id', async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id)
      if (!user) return res.status(404).json({ error: "User not found" })
      res.status(200).json({ user })
    } catch(err) {
      next(err)
    }
  })
// POST   /users
router.post('/', async (req, res, next) => {
    try {
      const user = await User.create(req.body)
      res.status(201).json({ user })
    } catch(err) {
      next(err)
    }
  })
// DELETE /users/:id
router.delete('/:id', async (req, res, next) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id)
      if (!user) return res.status(404).json({ error: "User not found" })
      res.status(200).json({ message: "User deleted!" })
    } catch(err) {
      next(err)
    }
  })

  module.exports=router;