const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  const user_id = req.session.user_id;

  // console.log('\n ---------------- \n');
  // console.log('From commentRoutes: ' + req.body);
  // console.log('\n ---------------- \n');

  const postData = await Post.create({ ...req.body, user_id });

  res.status(200).json(postData);
});

module.exports = router;