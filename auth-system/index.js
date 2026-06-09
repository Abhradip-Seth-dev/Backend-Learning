const express = require('express');
const logger = require('./middleware/logger');
const app = express();
const mongoose = require('mongoose');
const userAuthRouter = require('./routes/auth')
const cors = require('cors');
const helemt = require('helmet');
const rateLimit = require('express-rate-limit');
const { default: helmet } = require('helmet');

const generalLimit = rateLimit({
    windowMs:15*60*1000,
    max:100,
    message:{error:"Too many Requests"}
})
const authLimit = rateLimit({
    windowMs:15*60*1000,
    max:10,
    message:{error:"Too many Requests"}
})
app.use(helmet())
app.use(express.json());
app.use(logger);
app.use('/auth',userAuthRouter);
app.use(cors());
app.use(generalLimit);
app.use('/auth/login',authLimit)
app.use('/auth/register',authLimit)
mongoose.connect('mongodb+srv://charflowuser:7YXbIx8GMX7e2Zvb@cluster0.x4dqk7d.mongodb.net/lesson4-2?appName=Cluster0').then(()=>{
    console.log('MongoDB Connected!!');

    app.listen(3000,()=>{
        console.log(`Server is runnning on 3000`);
        
    })
}).catch((err) => {
    console.log('❌ Connection failed:', err)
    process.exit(1)
  })


