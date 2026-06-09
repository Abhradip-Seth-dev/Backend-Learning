require('dotenv').config();
const jwt = require('jsonwebtoken');

function requireAuth(req,res,next){
    try{
        // get the token from the header
        const authHeader = req.headers['authorization'];

        if(!authHeader) return res.status(401).json({error:"No token was provided"});
        //extract the token from the header
        const token = authHeader.split(' ')[1];

        if(!token) return res.status(401).json({error:"Invalid token format"});
        //verify the token 

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        //attach the token payload to request body
        req.user = decoded;

        next();
    }catch(err){
        return res.status(401).json({error:"Invalid or expired token!"});
    }
}

function requireRole(...roles){
    return function(req,res,next){
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                error:"Acces Denied! Required Role is not fullfiled"
            })
        }

        next()
    }
}


module.exports = {requireAuth,requireRole};