const express=require('express');
const expressAsyncHandler=require('express-async-handler');
const OrderModel=require('../models/OrderModel');
const orderRouter=express.Router();

const {isAuth}=require("../utils")


orderRouter.post('/',isAuth,expressAsyncHandler(async(req,res)=>{
    const newOrder=new OrderModel({
        orderItems:req.body.orderItems.map(x=>({...x,product:x._id})),
        shippingAddress:req.body.shippingAddress,
        paymentMethod:req.body.paymentMethod,
        itemsPrice:req.body.itemsPrice,
        shippingPrice:req.body.shippingPrice,
        taxPrice:req.body.taxPrice,
        totalPrice:req.body.totalPrice,
        user:req.user._id,
    })
    const order=await newOrder.save();
    console.log(order);
    return res.status(201).json({message:"New order created",order})

}))

orderRouter.get("/:id",isAuth,expressAsyncHandler(async(req,res)=>{
    console.log("aq shemodis vafshe????")
    const {id:orderId}=req.params;
    const order=await OrderModel.findById(orderId);
    if(order) {
        console.log("warmat")
        res.send(order);
    }else{
        res.status(404).send({message:"Order not found"})
    }
}))


module.exports=orderRouter;




