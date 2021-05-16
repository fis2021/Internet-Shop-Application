const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json("You reached the root page of API");
});

module.exports = router;
