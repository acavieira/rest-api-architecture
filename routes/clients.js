const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');

// GET all clients with filter, pagination and sorting
router.get('/', clientsController.getAllClients);

// GET client by ID with HATEOAS
router.get('/:id', clientsController.getClientById);

// POST new client
router.post('/', clientsController.createClient);

// PUT update client by ID
router.put('/:id', clientsController.updateClient);

// DELETE client by ID
router.delete('/:id', clientsController.deleteClient);

module.exports = router;