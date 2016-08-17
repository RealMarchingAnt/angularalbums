var mongo = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

var albums = {

    /**
     * Get all albums
     */
    all(cb) {
        var collection = mongo.DB.collection('albums');
        var result = collection.find({}).toArray(function (err, docs) {
            cb(err, docs);
        })
    },

    /**
     * Get one album
     */
    find(albumid, cb) {
        var collection = mongo.DB.collection('albums');
        // var o_id = new ObjectID(albumid);
        // console.log("o_id: " + o_id);
        var result = collection.findOne({ "_id": albumid }, function (err, doc) {
            cb(err, doc);
        });
    }
}

module.exports = albums;