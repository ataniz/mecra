const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// @route POST api/posts
// @desc  Create a Post
// @access Private
router.post('/', [auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newPost = new Post({
      state: req.body,
      // title: req.title,
      name: user.name,
      user: req.user.id,
      avatar: user.avatar,
    });

    const post = await newPost.save();

    //add the post to users profile
    const profile = await Profile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res.status(400).json({ msg: 'User has no profile!' });
    }

    profile.posts.unshift({ post: post.id });

    await profile.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/posts
// @desc  Get all posts
// @access Public
router.get('/', async (req, res) => {
  try {
    //   get all posts and sort them by date newest first
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/posts/:id
// @desc  Get a post by ID
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/posts/:id
// @desc  Delete a post
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route PUT api/posts/upvote/:id
// @desc  upvote a post
// @access Private
router.put('/upvote/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.votes.upvotes.filter(
        (upvote) => upvote.user.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).json({ msg: 'Post is already upvoted' });
    }

    //remove existing downvote
    if (
      post.votes.downvotes.filter(
        (downvote) => downvote.user.toString() === req.user.id
      ).length > 0
    ) {
      post.votes.downvotes = post.votes.downvotes.filter(
        (vote) => vote.user.toString() !== req.user.id
      );
    }

    // unshift === push to beginning
    post.votes.upvotes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.votes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route PUT api/posts/downvote/:id
// @desc  Undownvote a post
// @access Private
router.put('/downvote/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.votes.downvotes.filter(
        (downvote) => downvote.user.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).json({ msg: 'Post is already downvoted' });
    }

    //remove existing upvote
    if (
      post.votes.upvotes.filter(
        (upvote) => upvote.user.toString() === req.user.id
      ).length > 0
    ) {
      post.votes.upvotes = post.votes.upvotes.filter(
        (vote) => vote.user.toString() !== req.user.id
      );
    }

    post.votes.downvotes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.votes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// TODO: Add reply option to a comment (which will probably require creating a new model) and a reddit like up/downvote system
// @route POST api/posts/comment/:id
// @desc  Create a comment
// @access Private
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route DELETE api/posts/comment/:id/:comment_id
// @desc  Delete a comment
// @access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    // find the post
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // find the comment
    const comment = await post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    // check if its the commenting user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
