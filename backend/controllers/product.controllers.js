const Product = require('../models/product.model');





exports.getByName = (req,res,next) => {
  console.log(req.params.name);


  Product.find({"name": {"$regex":req.params.name, "$options": "i"}}).then(data => {
    console.log(data)
    if(data){
      res.status(201).json({categoryProducts:data})
    }else{
      res.status(404).json({message:"Category Not Found"})
      }
    })
  }
// exports.getByName  = async (req,res,next) => {
//   console.log("huuuuuuuuuuuu",req.params.name ,"zzzzzzzzzzzzzzzzzz");
//   const Category =  await req.params.name;

//   Product.find({name:Category}).then(data => {
//     console.log(data)
//     if(data){
//       res.status(201).json({categoryProducts:data})
//     }else{
//       res.status(404).json({message:"Category Not Found"})
//       }
//     })

//   }


  exports.getCategory = (req,res,next) => {
    console.log(req.params.category);
    const Category = req.params.category;

    Product.find({category:req.params.category}).then(data => {
      console.log(data)
      if(data){
        res.status(201).json({categoryProducts:data})
      }else{
        res.status(404).json({message:"Category Not Found"})
        }
      })
    }



exports.createProduct = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");  // http + :// +  localhost:3000

  const product = new Product({
    name :req.body.name,
    description: req.body.description,
    price: parseInt(req.body.price),
    category: req.body.category,
    image: url + "/images/" + req.file.filename
  })

  product.save().then(savedData => {
    res.status(201).json({
      message: "Product Saved Successfully",
      product:{
        ...savedData,
        id:savedData._id
      }
    })
  }).catch(error => {
    res.status(500).json({
      message: "Creating Product Failed !"
    })
  })
};



exports.getProducts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;


  const productQuery = Product.find();


  let fetchedProducts;
  if (pageSize && currentPage) {
    productQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  productQuery.then(documents => {

    fetchedProducts = documents;
    // console.log(fetchedProducts)
    // console.log(Product.count())
      return Product.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Products fetched successfully!",
        products: fetchedProducts,
        maxProducts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching products failed!"
      });
    });
};

exports.getProduct = (req,res,next) => {

  Product.findById({_id:req.params.id}).then(product => {
    if(product){
      res.status(201).json(product)
    }else {
      res.status(404).json({
        message: "Product Not Found"
      })
    }

  }).catch(error => {
    res.status(500).json({
      message:"Fetching Product Failed !"
    })
  })
}


exports.updateProduct = (req,res,next) => {
  console.log(req.file ,"body")
  console.log(req.body)
  let image = req.body.image;
  let imageo  = 19;


  const newImage = "http://localhost:3000/images/" +imageo + "." + "jpg"
  //'http://localhost:3000/images/listerine-original-250-gm-1586727626407.jpg

  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    image = url + "/images/" + req.file.filename;
  }

  const product = new Product({
    _id: req.body.id,
    name :req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image:newImage
  })

  Product.updateOne({_id:req.body.id} , product).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Couldn't Udpate Product!"
    });
  });

}



exports.deleteProduct = (req, res, next) => {
  console.log(req.params.id,"dsfdfds")
  Product.deleteOne({ _id: req.params.id})
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
};









