const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const authenticateToken = require('../middleware/authMiddleware');

// GET all products
router.get('/', productsController.getAllProducts);

// GET product by ID
router.get('/:id', productsController.getProductById);

// POST new product (protected)
router.post('/', authenticateToken, productsController.createProduct);

// PUT update product by ID (protected)
router.put('/:id', authenticateToken, productsController.updateProduct);

// DELETE product by ID (protected)
router.delete('/:id', authenticateToken, productsController.deleteProduct);

module.exports = router;
