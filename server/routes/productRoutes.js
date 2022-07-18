const express=require('express');
const {StatusCodes}=require('http-status-codes')

const productRouter=express.Router();

const ProductModel=require("../models/ProductModel")

productRouter.get("/",async(req,res)=>{
    const products=await ProductModel.find({});
    res.send(products);
})

productRouter.get("/slug/:id",async(req,res)=>{
    const {id}=req.params;
    const product=await ProductModel.findOne({slug:id});
    if(product) {
        return res.status(StatusCodes.OK).send(product);
    }else{
        return res.status(StatusCodes.NOT_FOUND).send({message:"Product not found"})
    }
})

productRouter.get("/:id",async(req,res)=>{
    const {id}=req.params;
    const product=await ProductModel.findById(id);
    if(product) {
        return res.status(StatusCodes.OK).send(product);
    }else{
        return res.status(StatusCodes.NOT_FOUND).send({message:"Product not found"})
    }
})

module.exports=productRouter;

