const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('../db/connection');
const User = require('../model/userSchema');
const Events = require('../model/eventsSchema');

// Authentication page

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

      // let token = await loginUser.jenerateAuthToken();
      // res.cookie('jwtoken', token, {
      //   expires: new Date(Date.now() + 2589000000),
      //   httpOnly: true,
      // });

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

module.exports = router;
