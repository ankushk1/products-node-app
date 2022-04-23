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
const { validateUser } = require("../middleware/jwt");

router.post("/createProduct", validateUser, createProduct);
router.get("/getProducts", getProducts);
router.put("/updateProduct/:id", validateUser, updateProduct);
router.delete("/deleteProduct/:id", validateUser,  deleteProduct);
router.delete("/deleteProductByFilter", validateUser,  deleteProductByFilter);
router.get("/getProductByID/:id", getProductByID);
router.get("/getProductByUserId/", validateUser,  getProductByUserId);
router.put("/productBought/:productId", validateUser, productBought);

module.exports = router;
