const jwt= require("jsonwebtoken");
const usermodel=require('../models/User')
const dotenv=require('dotenv');
dotenv.config()
const auth=(req,res,next)=>{
    try {
        let token=req.headers.authorization;
        if(token){
            token=token.split(" ")[1];
            let user=jwt.verify(token,process.env.SECRET_KEY);
            req.userid=user.id;
        }else{
            res.status(401).json({messsage:"unauthorizes"})
        }
        next()
    } catch (error) {
        res.status(401).json({messsage:"unauthorizes"})
    }
};

module.exports=auth;