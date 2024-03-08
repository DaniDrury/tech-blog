const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
// sequelize get expression - findAll blog posts with username data and ordered by creation date
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

// serialize data so the template can read it -- these methods are repeated in following render functions
  const posts = postData.map((post) => post.get({ plain: true }));

// pass data and session flag into tempate
  res.render('homepage', { posts, logged_in: req.session.logged_in });
});

// renders "New Post" page with input form, checks for logged-in authorization using withAuth middleware
router.get('/post/new', withAuth, (req, res) => {
  res.render('post-form-new', { logged_in: req.session.logged_in });
});

// render individual post page - does not require logged in status to view
router.get('/post/:id', async (req, res) => {
  const id = req.params.id;

  // sequelize get expression - find post by primary key / id
  const postData = await Post.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ['name'],
      },
      {
        model: Comment,
        // include the Comment's user_id name attribute
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      },
    ],
  });

  const post = postData.get({ plain: true });

  res.render('post', { post, logged_in: req.session.logged_in });
});

// render user dashboard, requires logged-in status
router.get('/dashboard', withAuth, async (req, res) => {
  // sequelize get expression - findAll blog posts where user_id matches logged_in user_id
  const postData = await Post.findAll({
    where: { user_id: req.session.user_id },
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

  // serialize data so the template can read it
  const posts = postData.map((post) => post.get({ plain: true }));

  // pass data and session flag into tempate
  res.render('dashboard', { posts, logged_in: req.session.logged_in });
});

// render post-form-edit view for a specific post with that post data passed to the .hbs
router.get('/dashboard/:id', withAuth, async (req, res) => {
  const id = req.params.id;
  
  const postData = await Post.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ['name'],
      },
      {
        model: Comment,
        // include the Comment's user_id name attribute
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      },
    ],
  });

  const post = postData.get({ plain: true });
  console.log(post);

  res.render('post-form-edit', { post, logged_in: req.session.logged_in });
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;