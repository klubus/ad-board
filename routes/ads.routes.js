const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const AdController = require('../controllers/ads.controller');
const authMiddleware = require('../utils/authMiddleware');

// === MULTER CONFIG ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// === ROUTES ===
router.get('/ads', AdController.getAll);
router.get('/ads/:id', AdController.getAdById);
router.post(
  '/ads',
  authMiddleware,
  upload.single('image'),
  AdController.createAd
);
router.put(
  '/ads/:id',
  authMiddleware,
  upload.single('image'),
  AdController.editAd
);
router.delete('/ads/:id', authMiddleware, AdController.deleteAd);
router.get('/ads/search/:searchPhrase', AdController.getAdBySearchPhrase);

module.exports = router;
