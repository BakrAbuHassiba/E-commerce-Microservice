const express = require('express');
const ProductCtrl = require('../controllers/product-ctrl');
const router = express.Router();

router.get('/products', ProductCtrl.getProducts);

router.get('/products/:id', ProductCtrl.getProductById);

router.post('/create-product', ProductCtrl.createProduct);

router.delete('/delete-product/:id', ProductCtrl.deleteProduct);

router.put('/update-product/:id', ProductCtrl.updateProduct);


module.exports = router