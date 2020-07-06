const mongoose = require('mongoose');



const CartSchema = mongoose.Schema({
  name : { type:String , required:true },
  image : { type:String , required:true },
  price : { type:Number , required:true },
  amount  : { type:Number , required: true },
})

module.exports = mongoose.model("Cart" , CartSchema)
