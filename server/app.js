const express = require('express');
const app = express();
const hbs = require('hbs');
const cookieParser = require('cookie-parser');

require('dotenv').config();
require('./db/connection');
require('./model/userSchema');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const SchoolPDT = require('./model/schoolSchema');
const SchoolWTD = require('./model/schoolwtdSchema');
const SchoolA = require('./model/schoolaSchema');

app.use(require('./router/auth'));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');

//Registering our own helper
hbs.registerHelper('list', function (context, options) {
  let ret = '';

  for (var i = 0, j = context.length; i < j; i++) {
    ret = ret + options.fn(context[i]);
  }

  return ret;
});

//Static Pages Array
const pages = [
  '/school',
  '/freelancer',
  '/signup',
  '/highschool',
  '/highschool_advice',
  '/highschool_pdt',
  '/highschool_wtd',
  '/freelancer',
  '/graduate',
  '/cgraduate',
  '/pgraduate',
  '/recruiter',
  '/jobpost',
  '/employee',
  '/jobs',
];

//Function to load page
pages.forEach((page) => {
  app.get(page, (req, res) => {
    res.render(page.slice(1));
  });
});

//Dyanamic pages
app.get('/', (req, res) => {
  res.render('index', {
    registered: false,
    events: {
      images: ['events-1.jpg', 'events-2.jpg', 'events-3.jpg'],
    },
  });
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

app.post('/signup', async (req, res) => {
  try {
  } catch (error) {
    res.status(400).send(error);
  }
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

//Server
app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
