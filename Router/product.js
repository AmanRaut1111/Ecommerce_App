const express = require("express");
const router = express.Router();
const productModel = require("../models/Product");
const verifyToken = require("../Middleware/auth");

//add product
router.post("/addproduct", verifyToken, async (req, res) => {
  try {
    const productdata = new productModel(req.body);
    const savedata = await productdata.save();
    if (savedata) {
      res
        .status(200)
        .json({
          message: "Product Added Sucessfully...!",
          status: true,
          data: savedata,
        });
    } else {
      res
        .status(400)
        .json({ message: "Somthing Went wrong..!", status: false, statusCode:400 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Somthing Went wrong..!", status: false,statusCode:500 });
  }
});

//updateproduct

router.put('/updateProduct/:id',async(req,res)=>{
    try {
        const id=req.params.id
        const data=await productModel.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true}
        );
        console.log(data);
        if(data){
            console.log(data);
            res.status(200).json({message:"Product updated sucessfully",data:data,status:true})

        }else{
            res.status(400).json({ message: "Somthing Went wrong..!", status: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Somthing Went wrong..!", status: false });
    }
});

//delete product

router.delete('/updateProduct/:id',async(req,res)=>{
    try {
        const id=req.params.id
        const data=await productModel.findOneAndDelete(id);
        if(data){
            console.log(data);
            res.status(200).json({message:"Product deleted sucessfully",data:data,status:true})

        }else{
            res.status(400).json({ message: "Somthing Went wrong..!", status: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Somthing Went wrong..!", status: false });
    }
});

//get all product

router.get('/getProduct',async(req,res)=>{
    
    try {
        const qcateogr=req.query.qcateogr

      const data=await productModel.find({categories:{
                $in:[qcateogr]
            }})
        if(data){
            res.status(200).json({message:"Data found...",status:true,data:data})
        }else{
            res.status(400).json({ message: "Somthing Went wrong..!", status: false });
        }
 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Somthing Went wrong..!", status: false }); 
    }
})



module.exports=router;
