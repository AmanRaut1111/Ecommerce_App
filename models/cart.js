const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
 userId:{
  type:mongoose.Schema.Types.ObjectId
 },

 Products:[{
  productId:{
    type:mongoose.Schema.Types.ObjectId
  },
  quantity:{
    type:Number,
    default:1
  }
 }]
});

module.exports = mongoose.model("cart", CartSchema);
