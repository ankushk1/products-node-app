const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  deleteProductByFilter,
  getProductByID,
  getProductByUserId,
  productBought
} = require("../controllers/productsController");

router.post("/createProduct", createProduct);
router.get("/getProducts", getProducts);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.delete("/deleteProductByFilter", deleteProductByFilter);
router.get("/getProductByID/:id", getProductByID);
router.get("/getProductByUserId/:userId", getProductByUserId)
router.put("/productBought/:userId/:productId", productBought)

module.exports = router;
