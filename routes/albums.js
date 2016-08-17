var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var albums = require('../models/albums');

router.use(bodyParser.json());

/**
 * Returns all albums
 */
router.get('/', function(req, res, next) {
  var result = albums.all(function (err, obj) {
    res.json(obj);
  })
});

/**
 * Return a specific album
 */
router.get('/:id', function(req, res, next) {
  
  var albumid = req.params.id;
  var album = albums.find(albumid, function(err, obj) {
    if (err) {
      console.log("Error when finding album: ", err);
    }
    res.json(obj);
  })

});

module.exports = router;
