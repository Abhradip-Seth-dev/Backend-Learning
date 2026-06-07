const express = require('express')
const app = express()
const userRouter = require('./routes/users')
app.use(express.json()) // parse request body


app.use("/users",userRouter);


// 404 catch all
app.use(function(req, res) {
  res.status(404).json({ error: "Route not found" })
})

app.listen(3000, function() {
  console.log('🚀 Server running on http://localhost:3000')
})