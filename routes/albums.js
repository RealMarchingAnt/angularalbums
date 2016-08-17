var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var mockalbums = [
  {
    _id: "123",
    title: "Album 1",
    description: "This is my albums",
    coverimage: "test.png"
  },
    {
    _id: "456",
    title: "Album 2",
    description: "This is my second album",
    coverimage: "test2.png"
  }

];

router.use(bodyParser.json());

/**
 * Returns all albums
 */
router.get('/', function(req, res, next) {
  res.json(mockalbums);
});

/**
 * Return a specific album
 */
router.get('/:id', function(req, res, next) {
  
  var id = req.params.id;

  var result = mockalbums.filter(function(obj) {
    return obj._id == id;
  })[0];

  if (!result) {
    console.log("Album with id " + id + " not found");
    res.sendStatus(404);
  }

  res.json(result);

});

module.exports = router;
