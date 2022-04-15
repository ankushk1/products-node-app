const express = require('express');
const router = express.Router();
const {createProduct, getProducts, updateProduct} = require('../controllers/productsController')

router.post('/createProduct', createProduct)
router.get('/getProducts', getProducts)
router.put('/updateProduct/:id', updateProduct)


module.exports = router