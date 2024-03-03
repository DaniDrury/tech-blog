const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
// sequelize get expression - findAll blog posts
  const postData = await Post.findAll({
    include: [
      {
        model: User,
        attributes: ['name'],
      },
    ],
    order: [
      ['createdAt', 'ASC'],
    ],
  });

  if (!postData) {
    throw new Error('No posts found');
  }

// serialize data so the template can read it
  const posts = postData.map((post) => post.get({ plain: true }));

// pass data and session flag into tempate
  res.render('homepage', { posts, logged_in: req.session.logged_in });
});

router.get('/dashboard', withAuth, async (req, res) => {
  console.log('You are logged in.');
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;