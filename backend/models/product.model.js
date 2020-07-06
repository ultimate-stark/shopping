const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name : { type:String , required:true },
  description : { type:String , required:true },
  category : { type:String , required:true },
  price: { type:Number , required:true },
  image : { type:String , required:true}
})

module.exports = mongoose.model("Product" , productSchema)








// Module {
//   id: '.',
//   exports: {},
//   parent: null,
//   filename: '/home/jim/Desktop/index.js',
//   loaded: false,
//   children: [],
//   paths:
//    [ '/home/jim/Desktop/node_modules',
//      '/home/jim/node_modules',
//      '/home/node_modules',
//      '/node_modules' ] }





// exports.foo = 'foo';
// console.log(module);


// Module {
//   id: '.',
//   exports: { foo: 'foo' },
