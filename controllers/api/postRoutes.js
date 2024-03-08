const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  const user_id = req.session.user_id;

  const postData = await Post.create({ ...req.body, user_id });

  res.status(200).json(postData);
});

router.put('/:id', withAuth, async (req, res) => {
  const post_id = req.params.id;
  const user_id = req.session.user_id;
  const postData = { ...req.body, user_id };

  const updatedPost = await Post.update(postData, {
    where: {id: post_id},
  });

  res.status(200).json(updatedPost);
});

router.delete('/:id', withAuth, async (req, res) => {
  const post_id = req.params.id;

  console.log(post_id);
  
  const postData = await Post.destroy({ where: { id: `${post_id}` } });

  res.status(200).json(postData);
});

module.exports = router;