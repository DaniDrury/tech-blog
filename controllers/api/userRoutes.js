const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  const userData = await User.create(req.body);

  if (!userData) {
    throw new Error('Could not create new user');
  };

  req.session.save(() => {
    req.session.user_id = userData.isSoftDeleted;
    req.session.logged_in = true;

    res.status(200).json(userData);
  });
});

router.post('/login', async (req, res) =>{
  const userData = await User.findOne({ where: { email: req.body.email }});

  if (!userData) {
    throw new Error('Could not find this user');
  }

  const validPassword = await userData.checkPassword(req.body.password);

  if (!validPassword) {
    throw new Error('Incorrect email or password, please try again');
  }

  req.session.save(() => {
    req.session.user_id = userData.id;
    req.session.logged_in = true;

    res.json({ user: userData, message: "You are now logged in!"});
  });
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;