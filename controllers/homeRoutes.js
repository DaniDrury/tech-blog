const router = require('express').Router();
const {} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
// sequelize get expression - findAll blogPosts

// serialize data so the template can read it?

// pass data and session flag into tempate
  res.render('homepage', {
    // replace variable
    serialized_data,
    logged_in: req.session.logged_in
  })


  // error handling somewhere in here, not necessarily below
});

