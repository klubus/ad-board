const Ad = require('../models/Ad.model');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

exports.getAll = async (req, res) => {
  try {
    res.json(await Ad.find({}).populate('seller', 'login'));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate('seller', 'login');
    if (!ad) res.status(404).json({ message: 'Not found' });
    else res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.createAd = async (req, res) => {
  try {
    const { title, description, price, location, seller } = req.body;
    let image = req.file ? req.file.filename : req.body.image;

    if (!req.session.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const newAd = new Ad({
      title,
      description,
      price,
      location,
      seller: new mongoose.Types.ObjectId(req.session.user.id),
      image,
    });

    await newAd.save();
    res.status(201).json(newAd);
  } catch (err) {
    res.status(500).json({ message: err.message, errors: err.errors });
  }
};

exports.editAd = async (req, res) => {
  const { title, description, price, image, location, seller } = req.body;
  try {
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: 'Not found...' });
    }
    const oldImage = ad.image;

    ad.title = title;
    ad.description = description;
    ad.price = price;
    ad.image = image;
    ad.location = location;
    ad.seller = seller;

    if (req.file) {
      ad.image = req.file.filename;
    }

    await ad.save();

    if (req.file && oldImage) {
      fs.unlinkSync(`./public/uploads/${oldImage}`);
    }

    res.status(200).json({ message: 'OK' });
  } catch (err) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({ message: 'Not found...' });
    }

    if (ad.image) {
      const filePath = path.join(
        __dirname,
        '..',
        'public',
        'uploads',
        ad.image
      );
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
          fs.unlink(filePath, (err) => {
            if (err) console.error('Error deleting file:', err);
          });
        }
      });
    }

    await Ad.deleteOne({ _id: req.params.id });

    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAdBySearchPhrase = async (req, res) => {
  try {
    const searchPhrase = req.params.searchPhrase;

    const ads = await Ad.find({
      title: { $regex: searchPhrase, $options: 'i' },
    });

    if (!ads.length) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
