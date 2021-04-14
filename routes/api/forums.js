const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Forum = require('../../models/Forum');

// @route POST api/forums
// @desc  Create a forum
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('info', "Without information trees don't grow").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, info, rules } = req.body;

    try {
      let forum = await Forum.findOne({ name });

      if (forum) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Forum already exists' }] });
      }
      const newForum = new Forum({
        name,
        user: req.user.id,
        info,
        rules,
      });

      newForum.admins.push({ user: req.user.id });
      newForum.members.push({ user: req.user.id });

      forum = await newForum.save();

      res.json(forum);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/forums
// @desc  Get all forums
// @access Public
router.get('/', async (req, res) => {
  try {
    //   get all forums and sort them by follower count
    // NOT SURE IF THIS WORKS! TODO
    const forums = await Forum.aggregate([
      { $project: { members_count: { $size: '$members' } } },
      { $sort: { members_count: -1 } },
    ]);
    res.json(forums);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/forums/:id
// @desc  Get a forum by ID
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const forum = await Forum.findById(req.params.id);
    if (!forum) {
      return res.status(404).json({ msg: 'forum not found' });
    }
    res.json(forum);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'forum not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/forums/:id
// @desc  Delete a forum
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const forum = await Forum.findById(req.params.id);
    if (!forum) {
      return res.status(404).json({ msg: 'Forum not found' });
    }
    if (forum.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await forum.remove();

    res.json(forum);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Forum not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route PUT api/forums/join/:id
// @desc  join a forum
// @access Private
router.put('/join/:id', auth, async (req, res) => {
  try {
    const forum = await Forum.findById(req.params.id);

    if (
      forum.members.filter((member) => member.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: 'Already joined' });
    }
    // unshift === push to beginning
    forum.members.unshift({ user: req.user.id });

    await forum.save();

    res.json(forum.members);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route PUT api/forums/leave/:id
// @desc  leave a forum
// @access Private
router.put('/leave/:id', auth, async (req, res) => {
  try {
    const forum = await Forum.findById(req.params.id);

    if (
      forum.members.filter((member) => member.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Youre not a member!' });
    }

    forum.members = forum.members.filter(
      (member) => member.user.toString() !== req.user.id
    );

    await forum.save();

    res.json(forum.members);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
