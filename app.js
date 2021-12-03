const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const bcrypt = require('bcryptjs');

require('dotenv').config();
require('./db/connection');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const User = require('./model/userSchema');
const Events = require('./model/eventsSchema');
const SchoolPDT = require('./model/schoolSchema');
const SchoolWTD = require('./model/schoolwtdSchema');
const SchoolA = require('./model/schoolaSchema');

app.use(require('./router/auth'));
app.set('view engine', 'hbs');
app.use(express.static('public'));
hbs.registerPartials(__dirname + '/views/partials');

//Registering our own helper
hbs.registerHelper('list', function (context, options) {
  var ret = '';

  for (var i = 0, j = context.length; i < j; i++) {
    ret = ret + options.fn(context[i]);
  }

  return ret;
});

app.get('/', (req, res) => {
  res.render('index', {
    registered: false,
    events: {
      images: ['events-1.jpg', 'events-2.jpg', 'events-3.jpg'],
    },
  });
});

app.get('/freelancer', (req, res) => {
  res.render('freelancer');
});

app.get('/signin', (req, res) => {
  res.render('signin', {
    invalid: false,
  });
});

app.post('/signin', async (req, res) => {
  try {
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', async (req, res) => {
  try {
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/school', (req, res) => {
  res.render('school');
});

app.get('/school_advice', async (req, res) => {
  const schoolA = await SchoolA.find({});

  res.render('school_advice', {
    school: schoolA.filter(function (o) {
      return o;
    }),
  });
});

app.get('/school_pdt', async (req, res) => {
  const schoolP = await SchoolPDT.find({});

  res.render('school_pdt', {
    school: schoolP.filter(function (o) {
      return o;
    }),
  });
});

app.get('/school_wtd', async (req, res) => {
  const schoolW = await SchoolWTD.find({});

  res.render('school_wtd', {
    school: schoolW.filter(function (o) {
      return o;
    }),
  });
});

app.get('/highschool', (req, res) => {
  res.render('highschool');
});

app.get('/highschool_advice', (req, res) => {
  res.render('highschool_advice');
});

app.get('/highschool_pdt', (req, res) => {
  res.render('highschool_pdt');
});

app.get('/highschool_wtd', (req, res) => {
  res.render('highschool_wtd');
});
app.get('/freelancer', (req, res) => {
  res.render('freelancer');
});

app.get('/graduate', (req, res) => {
  res.render('graduate');
});

app.get('/cgraduate', (req, res) => {
  res.render('cgraduate');
});

app.get('/pgraduate', (req, res) => {
  res.render('pgraduate');
});

app.get('/recruiter', (req, res) => {
  res.render('recruiter');
});

app.get('/jobpost', (req, res) => {
  res.render('jobpost');
});

app.get('/employee', (req, res) => {
  res.render('employee');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
