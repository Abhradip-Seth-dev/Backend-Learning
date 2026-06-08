function logger(req,res,next){
    console.log(`${req.url}${res.method}`);
    next();
}

module.exports = logger