const express = require('express');
const productController = require("../controllers/product.controllers");
const fileExtract = require("../middleware/file");
const router = express.Router();

router.put('/:id' , productController.updateProduct)

router.post("" , fileExtract , productController.createProduct);
router.get("" , productController.getProducts);
router.get('/:id' , productController.getProduct);
router.delete("/:id", productController.deleteProduct);

router.get("/category/:category", productController.getCategory)
router.get("/ByName/:name", productController.getByName)
module.exports = router;
