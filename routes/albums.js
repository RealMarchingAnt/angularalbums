var express = require('express');
var router = express.Router();

/* GET albums listing. */
router.get('/', function(req, res, next) {
  res.json({
    name: "Invention of Knowledge",
    artist: "Anderson/Stolt"
  });
});

module.exports = router;
