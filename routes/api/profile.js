const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route GET api/profile/me
// @desc Get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    // populate brings in the requested fields from the model
    const profile = await Profile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/profile
// @desc Create or update user profile
// @access Private
router.post(
  '/',
  [auth, [check('username', 'username is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      username,
      status,
      website,
      location,
      education,
      bio,
      interests,
      youtube,
      linkedin,
      github,
      twitter,
      facebook,
      instagram,
    } = req.body;

    // check if username exists
    let userProfile = await Profile.findOne({ username });

    if (userProfile && userProfile.user != req.user.id) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Username already exists' }] });
    }

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (username) profileFields.username = username;
    if (status) profileFields.status = status;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (education) profileFields.education = education;
    if (bio) profileFields.bio = bio;
    if (interests) {
      profileFields.interests = interests
        .split(',')
        .map((interest) => interest.trim());
    }
    // console.log(profileFields.interests);

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (github) profileFields.social.github = github;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //   Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //   Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/profile
// @desc Get all user profiles
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/profile/user/:user_id
// @desc Get profile by user ID
// @access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    // if the id is invalid respond with not found
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    res.status(500).send('Server Error');
  }
});

// @route Delete api/profile
// @desc Delete User, User Profile and Posts (Not sure about the posts maybe add a admin approval)
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    // Delete User's Profile
    const profile = await Profile.findOneAndRemove({ user: req.user.id });
    // Here findOneAndRemove and findOneAndDelete are both could be used?
    // Delete User
    const user = await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
