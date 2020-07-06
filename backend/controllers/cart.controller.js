const Cart = require("../models/cart.model");




exports.addToCart = (req,res,next) => {
  // console.log(req.body)

  const cart = new Cart({
    name : req.body.name,
    image : req.body.image,
    price:parseInt(req.body.price),
    amount:parseInt(req.body.amount)
  })

  cart.save().then(savedData =>{
      res.status(201).json({
        message:"Cart Saved Successfully !",
        Cart:savedData
      })
  }).catch(error => {
    res.status(500).json({
      message: " Cart Not saved"
    })
  })
}


exports.getCart = (req, res, next) => {

Cart.find().then(documents => {
      res.status(201).json({
        message: "cart fetched successfully!",
        carts:documents
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching products failed!"
      });
    });
};

exports.updateCart = (req,res,next) => {
 const cart = new Cart({
  _id: req.body.id,
  name: req.body.name,
  price: req.body.price,
  image: req.body.image,
  amount: req.body.amount
 })


  Cart.updateOne({_id:req.body.id} , cart).then(data => {
    if(data.n > 0){
      res.status(201).json({
        message: "Update successful!"
      })
    }else{
      res.status(401).json({ message: "Not authorized!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Couldn't udpate post!"
    })
  })
}


exports.deleteItem = (req,res,next) => {

  console.log(req.params)
  Cart.deleteOne({ _id: req.params.id})
  .then(result => {
    console.log(result);
    if (result.n > 0) {
      res.status(200).json({ message: "Deletion successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Deleting product failed!"
    });
  });
}


// exports.getByname = (req,res,next) => {
//   console.log(req.params);
//   Cart.find({name :req.params.name }).then(data => {
//     console.log(data)
//   })

// }
