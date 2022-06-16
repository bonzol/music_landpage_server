const express = require('express');

const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/artists', authController.authTokenAdmin, adminController.getAllArtists);
router.get('/artists/:artistId', authController.authTokenAdmin, adminController.getArtist);
router.post('/artists/add-artist', authController.authTokenAdmin, adminController.addArtist);
router.put('/artists/edit-artist', authController.authTokenAdmin, adminController.editArtist);
router.delete('/artists/delete-artist/:artistId', authController.authTokenAdmin, adminController.deleteArtist);

module.exports = router;
