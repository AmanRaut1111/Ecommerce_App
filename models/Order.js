const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },

  Products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      amount: {
        type: Number,
        required: true,
      },
      address:{
        type:Object,
        required:true
      },
      status:{
        type:String,
        default:"pending"

      }
    },
  ],
});

module.exports = mongoose.model("order", OrderSchema);
