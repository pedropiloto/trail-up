const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authenticate = require('../midleware/authenticate');

router.get('/', authenticate, eventController.getAll);
router.post('/', authenticate, eventController.create);
router.get('/:id', authenticate, eventController.getById);
router.put('/:id', authenticate, eventController.updateById);
module.exports = router;
