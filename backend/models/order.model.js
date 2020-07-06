const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
 totalPrice : {type:Number ,required:true },
 username: {type:String , required:true},
 phone:{type:String,required:true},
 address:{type:String, required:true},
 status:{type:String,default:"pending"},

})



