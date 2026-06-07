require('dotenv').config()
const express = require('express')
const app = express()
const logger = require('./middleware/logger')
const notesRouter = require('./routes/notes')
app.use(express.json())
app.use(logger)
// app.get('/',(req,res)=>{
//     res.send("Teri Amma ke xhode")
// })
app.use('/notes',notesRouter);

app.use((req, res, next) => {
    const err = new Error("Route not found!")
    err.status = 404
    next(err)
  })
  
  // Error handler — catches ALL errors
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      error: {
        message: err.message,
        status: err.status || 500
      }
    })
  })
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`)
})