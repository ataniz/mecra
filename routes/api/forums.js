const express = require('express');
const router = express.Router();

// @route POST api/forums
// @desc  Create a forum
// @access Private

// @route GET api/forums
// @desc  Get all forums
// @access Public (?)
router.get('/', (req, res) => {
  res.send('Forum Route');
});
// @route GET api/forums/:id
// @desc  Get a forum by ID
// @access Private

// @route DELETE api/forums/:id
// @desc  Delete a forum
// @access Private

module.exports = router;
