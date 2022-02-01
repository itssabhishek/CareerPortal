const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
let GoogleStrategy = require('passport-google-oauth20').Strategy;

require('../db/connection');
const User = require('../model/userSchema');
const Events = require('../model/eventsSchema');

//Passport Middleware
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      User.findOrCreate(
        {
          googleId: profile.id,
          fname: profile.name.givenName,
          lname: profile.name.familyName,
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.post('/signup', async (req, res) => {
  const { fname, lname, email, password, cpassword, profession } = req.body;

  if (!fname || !lname || !email || !password || !cpassword)
    return res.status(422).json({ error: 'Fill all fields' });

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist)
      return res.status(422).json({ error: 'Email already exist!' });

    const user = new User({
      fname,
      lname,
      email,
      password,
      cpassword,
      profession,
    });

    await user.save();

    res.render('signin');
  } catch (err) {
    console.log(err);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({ error: 'Please fill all fields.' });
    const loginUser = await User.findOne({ email: email });
    const eventVideo = await Events.find({});
    if (loginUser) {
      const isMatch = await bcrypt.compare(password, loginUser.password);

      // let token = await loginUser.generateAuthToken();
      // res.cookie('jwt', token, {
      //   expires: new Date(Date.now() + 2589000000),
      //   httpOnly: true,
      // });

      console.log(`This is the cookie awesome ${req.cookies.jwt}`);

      if (!isMatch)
        res.render('signin', {
          invalid: true,
        });
      res.render('index', {
        name: loginUser.fname,
        registered: true,

        //To loop through all array element
        events: {
          videos: eventVideo.map((a) => a.link),
        },
      });
    } else {
      res.render('signin', {
        invalid: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// Authentication page
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/signin' }),
  (req, res) => {
    res.render('index', {
      registered: true,
    });
  }
);

module.exports = router;
