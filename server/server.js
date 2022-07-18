
const express=require('express');
const app=express();
const seedRouter=require("./routes/seedRoutes");
const productRouter=require("./routes/productRoutes");
const userRouter=require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');

const cors=require('cors')
app.use(cors());
const data=require("./data");
const {StatusCodes}=require("http-status-codes")
const dotenv=require('dotenv')
const mongoose=require('mongoose');
dotenv.config();
  

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('connected to DB')
}).catch(err=>{
        console.log(err.message);
})
   
      
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/keys/paypal",(req,res)=>{
    return res.send(process.env.PAYPAL_CLIENT_ID||"sb")
})

app.use("/seed",seedRouter)
app.use("/products",productRouter)
app.use('/users',userRouter);
app.use("/orders",orderRouter)


app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})



app.listen(4000,console.log('app running at http://localhost:4000'))