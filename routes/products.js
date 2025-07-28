const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// GET all products
router.get('/', productsController.getAllProducts);

// GET product by ID
router.get('/:id', productsController.getProductById);

// POST new product
router.post('/', productsController.createProduct);

// PUT update product by ID
router.put('/:id', productsController.updateProduct);

// DELETE product by ID
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
