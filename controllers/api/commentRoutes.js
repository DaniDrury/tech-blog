const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
  const user_id = req.session.user_id;

  const commentData = await Comment.create({ ...req.body, user_id });

  res.status(200).json(commentData);
})

module.exports = router;