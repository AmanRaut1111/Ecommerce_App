const router=require('express').Router();
const dotenv=require('dotenv');
const { default: Stripe } = require('stripe');
dotenv.config();



router.post('/payment',(req,res)=>{
    Stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"ind"
    },(stripeErr,stripeRes)=>{
  if(stripeErr){
    res.status(500).json({mesage:"Something went wrong",status:false})
  }else{
    res.status(200).json({message:"Payment sucessfully..!",status:true})
  }
    })
})

mmodule.exports=router