require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const logger = require('./middleware/logger')
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
app.use(express.json());
app.use(logger)
app.use('/users',userRouter);
app.use('/posts',postRouter);

app.use((req, res, next) => {
    const err = new Error('Route not found!')
    err.status = 404
    next(err)
  })
  
  // Centralized error handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      error: {
        message: err.message,
        status: err.status || 500
      }
    })
  })
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('MongoDB Connected!!');

    app.listen(process.env.PORT,()=>{
        console.log(`Server is runnning on ${process.env.PORT}`);
        
    })
}).catch((err) => {
    console.log('❌ Connection failed:', err)
    process.exit(1)
  })

