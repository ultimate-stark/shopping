const cartController =  require('../controllers/cart.controller');
const express = require('express');
const router = express.Router();



router.post("" ,cartController.addToCart);
router.get("" , cartController.getCart);
router.put("/:id" , cartController.updateCart);
router.delete("/:id" , cartController.deleteItem)
// router.get("/name/:name", cartController.getByname)

 module.exports = router;
