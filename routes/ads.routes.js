const express = require('express');
const router = express.Router();
const AdController = require('../controllers/ads.controller');
const authMiddleware = require('../utils/authMiddleware');

router.get('/ads', AdController.getAll);
router.get('/ads/:id', AdController.getAdById);
router.post('/ads', authMiddleware, AdController.createAd);
router.put('/ads/:id', authMiddleware, AdController.editAd);
router.delete('/ads/:id', authMiddleware, AdController.deleteAd);
router.get('/ads/search/:searchPhrase', AdController.getAdBySearchPhrase);

module.exports = router;
