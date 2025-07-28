const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');
const authenticateToken = require('../middleware/authMiddleware');

// GET all clients with filter, pagination and sorting
router.get('/', clientsController.getAllClients);

// GET client by ID with HATEOAS
router.get('/:id', clientsController.getClientById);

// POST new client (protected)
router.post('/', authenticateToken, clientsController.createClient);

// PUT update client by ID (protected)
router.put('/:id', authenticateToken, clientsController.updateClient);

// DELETE client by ID (protected)
router.delete('/:id', authenticateToken, clientsController.deleteClient);

module.exports = router;