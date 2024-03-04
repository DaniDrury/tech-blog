const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
  const userData = await User.create(req.body);

  req.session.save(() => {
    req.session.user_id = userData.id;
    req.session.logged_in = true;

    res.status(200).json({ user: userData, message: "You've created an account and are logged in!" });
  });
});

router.post('/login', async (req, res) =>{
  const userData = await User.findOne({ where: { email: req.body.email }});

  const validPassword = userData.checkPassword(req.body.password);

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