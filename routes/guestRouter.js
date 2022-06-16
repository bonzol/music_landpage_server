const express = require('express');

const guestController = require('../controllers/guestController');

const router = express.Router();

router.get('/:username', guestController.getArtist);

module.exports = router;
