const express = require('express');
const ProductCtrl = require('../controllers/product-ctrl');
const router = express.Router();

router.get('/products', ProductCtrl.getProducts);
router.post('/create-product', ProductCtrl.createProduct);
router.delete('/delete-product/:id', ProductCtrl.deleteProduct);

module.exports = router