const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv=require('dotenv');
dotenv.config();


router.post("/register", async (req, res) => {
  const hashpassword = await bcrypt.hash(req.body.password, 10);

  const newuser = new UserModel({
    userName: req.body.userName,
    email: req.body.email,
    password: hashpassword,
  });

  const data = await newuser.save();
  if (data) {
    res.status(200).json({
      message: "User Registerd Sucessfully..!",
      status: true,
      Userdata: data,
    });
  } else {
    res.status(400).json({ message: "something went wrong..!", status: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (userName && password) {
      let getData = await UserModel.findOne({ userName });
    
      if (getData) {
        console.log(getData);
        let result = await bcrypt.compare(password, getData.password);
        const token=jwt.sign({id:getData._id},process.env.SECRET_KEY,{expiresIn: "2h",})
        if (result) {
          res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Login Successfully...!",
            data: getData,
            token:token
          });
        } else {
          res.status(400).json({
            status: false,
            statusCode: 400,
            message: "Invalid Credentials, Please Try Again",
          });
        }
      } else {
        res.status(400).json({
          status: false,
          statusCode: 400,
          message: "User is not found...!",
          status: false,
        });
      }
    }
  } catch (error) {
    console.log("error :", error);
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Something Went Wrong..",
    });
  }
});

module.exports = router;
