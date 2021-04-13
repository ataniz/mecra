const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcyript = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route GET api/auth
// @desc Test route
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    // -password leaves password off the data
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/auth
// @desc Authenticate user & get token
// @access Public
router.post(
  '/',
  [
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // check if the user exist
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // check if password is correct
      const isMatch = await bcyript.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      //   set expiration to 3600 = 1h before deployment
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
