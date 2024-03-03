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
  });

  if (!postData) {
    throw new Error('No posts found');
  }

// serialize data so the template can read it
  const posts = postData.map((post) => post.get({ plain: true }));

  console.log(posts);
// pass data and session flag into tempate
  res.render('homepage', { posts, logged_in: req.session.logged_in });
});

module.exports = router;