const jwt=require('jsonwebtoken')

const generateToken=(user)=>{
    return jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin

    },process.env.JWT_SECRET,{expiresIn:"30d"})
}

const isAuth=(req,res,next)=>{
    const authorization=req.headers.authorization;
    if(authorization) {
        const token=authorization.slice(7,authorization.length);
        jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
        if(err) {
            res.status(401).send({message:"Invalid token"})
        }else{
            console.log("anextebs?")
            req.user=decode;
            next();
        }
        })
    }else{
        return res.status(401).send({message:"No Token"})
    }
}
   

module.exports={generateToken,isAuth};

