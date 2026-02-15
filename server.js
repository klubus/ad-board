require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const adsRoutes = require('./routes/ads.routes');

app.use('/api', adsRoutes);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('Connected to the database');

    app.listen(8000, () => {
      console.log('Server is running on port: 8000');
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });