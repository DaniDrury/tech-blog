const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  const user_id = req.session.user_id;

  const commentData = await Comment.create({ ...req.body, user_id });

  res.status(200).json(commentData);
});

module.exports = router;