const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/auth");
const bcrypt = require("bcrypt");
const userModel = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();

//update user

router.put("/userUpdate/:id",  async (req, res) => {
  try {
    const id = req.params.id;
    const hash = await bcrypt.hash(req.body.password, 10);
    const userData = await userModel.findByIdAndUpdate(
      id,
      {
        $set: {
          password: hash,
          userName: req.body.userName,
        },
      },
      { new: true }
    );
    if (userData) {
      console.log(userData);
      res
        .status(200)
        .json({
          message: "User Updated Sucessfully",
          status: true,
          data: userData,
        });
    } else {
      res
        .status(400)
        .json({ message: "Something went wrong...", status: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong...", status: false });
  }
});

//delete user

router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userdata = await userModel.findByIdAndDelete(id);
    if (userdata) {
      res.status(200).json({ message: "User deleted Sucessfully...! " });
    } else {
      res.status(400).json({ message: "Something went Wrong", status: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went Wrong", status: false });
  }
});


//get all user



router.get('/getuser',async(req,res)=>{
    try {
        const data= await userModel.find().sort({_id:-1})
        if(data){
            res.status(200).json({message:"User Data Found Sucessfully...!",status:true,data:data})
        }else{
            res.status(400).json({message:"Something went Wrong...!",status:false,})
        }
    } catch (error) {
        res.status(500).json({message:"Something went Wrong...!",status:false,})
    }
});

module.exports=router