const jwt = require('jsonwebtoken');

module.exports=(req,res,next)=>{
    try{
        //Bearer [token]
        const token = req.headers.authorization.split(" ")[1];
        //Is it valid?
        const decoded =jwt.verify(token,"debugkey");
        req.user=decoded;
        //Lets move to pokemon
        next();
    }catch(error){
        return res.status(401).json({code:401,message:'Stop right there! You dont have permission!'});
    }
}