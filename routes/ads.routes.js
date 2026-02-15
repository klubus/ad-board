const express = require('express');
const router = express.Router();
const AdController = require('../controllers/ads.controller');

router.get('/ads', AdController.getAll);
router.get('/ads/:id', AdController.getAdById);
router.post('/ads', AdController.createAd);
router.put('/ads/:id', AdController.editAd);
router.delete('/ads/:id', AdController.deleteAd);

module.exports = router;
