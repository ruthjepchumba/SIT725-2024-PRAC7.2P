const express = require('express');
const router = express.Router();
const cardController = require('../Controller/cardController');

router.get('/cards', cardController.getAllCards);
router.post('/cards', cardController.createCard);

module.exports = router;
