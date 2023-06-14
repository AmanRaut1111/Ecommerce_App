const express=require("express");
const db=require('./config/db')
const dotenv=require('dotenv');
dotenv.config()

const UserRouter=require('./Router/user');
const authRouter=require('./Router/auth');
const ProductRouter=require('./Router/product');
const OrderRouter=require('./models/Order');
const cartRouter=require('./Router/cart')

const app= express();

app.use(express.json())


app.use('/user',UserRouter)
app.use('/auth',authRouter)
app.use('/product',ProductRouter)
app.use('./order',OrderRouter)
app.use('/cart',cartRouter)


app.listen(3000,()=>{
    console.log("Backend-server is listening on port 3000");
})