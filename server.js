require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');

app.use('/api', adsRoutes);
app.use('/auth', authRoutes);
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

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
