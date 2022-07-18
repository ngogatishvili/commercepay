const express=require('express');
const expressAsyncHandler=require('express-async-handler')
const User=require('../models/UserModel');
const bcrypt=require('bcryptjs');
const {generateToken} = require('../utils');

const userRouter=express.Router();

userRouter.post('/signin',expressAsyncHandler(async(req,res)=>{
    const user=await User.findOne({email:req.body.email});
    if(user) {
    if(bcrypt.compareSync(req.body.password,user.password)) {
        return res.send({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user)
        })
    }
    }
    return res.status(401).send({message:"Invalid E-mail or password"});
}))

userRouter.post('/signup',expressAsyncHandler(async(req,res)=>{
    const newUser=new User({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password)

    })
    const user=await newUser.save();
    res.send({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user)
        
    })
}))
module.exports=userRouter;

