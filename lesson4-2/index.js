const express = require('express');
const logger = require('./middleware/logger');
const app = express();
const mongoose = require('mongoose');
const userAuthRouter = require('./routes/users')
app.use(express.json());
app.use(logger);
app.use('/auth',userAuthRouter);

mongoose.connect('mongodb+srv://charflowuser:7YXbIx8GMX7e2Zvb@cluster0.x4dqk7d.mongodb.net/lesson4-2?appName=Cluster0').then(()=>{
    console.log('MongoDB Connected!!');

    app.listen(3000,()=>{
        console.log(`Server is runnning on 3000`);
        
    })
}).catch((err) => {
    console.log('❌ Connection failed:', err)
    process.exit(1)
  })


