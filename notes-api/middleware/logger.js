const express = require('express')
const app = express()


// Logger middleware
const logger = (req, res, next) => {
    const time = new Date().toISOString();
    console.log(`${req.method} ${req.url} - ${time}`);
    next();
  };
  
  module.exports = logger;