const Ad = require('../models/Ad.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Ad.find({}));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) res.status(404).json({ message: 'Not found' });
    else res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.createAd = async (req, res) => {
  try {
    const { title, description, price, image, location, seller } = req.body;
    const newAd = new Ad({
      title: title,
      description: description,
      price: price,
      image: image,
      location: location,
      seller: seller,
    });
    await newAd.save();
    res.status(201).json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
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
    if (ad) {
      await Ad.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
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
