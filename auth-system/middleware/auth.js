require('dotenv').config();
const { error } = require('console');
const jwt = require('jsonwebtoken');


function requireAuth(req,res,next){
    try{
    //get the header
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.status(401).json({error:"No token was provided"});
    //extract the token
    const token = authHeader.split(' ')[1];
    if(!token) return res.status(401).json({error:"Invalid TOken Format"});
    //verify the token'
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    //attach the token
    req.user = decoded;
    }catch(err){
        return res.status(401).json({error:"Invalid or expired token!"});
    }

}

function requireRole(...roles){
    return function(req,res,next){
        if(!roles.includes(req.user.role)){
            return res.json({
                error:"Acces Denied"
            })
        }else{
            next();
        }
    }
}
module.exports ={requireAuth,requireRole};
