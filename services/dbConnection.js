var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;

exports.connect = function (url) {
    if (mongo.DB) { return mongo.DB }
    mongoClient.connect(url, function (err, db) {
        if (err) {
            console.log("Problem with mongo");
            process.exit(1);
        } else {
            console.log("Yay, connected to mongo database!");
            mongo.DB = db;
            // Ensure collections exist
            db.collection('albums', { strict: true }, function (err, col) {
                if (err) {
                    console.log("Collection 'albums' did not exist, creating...");
                    mongo.DB.createCollection('albums', function (err, result) {
                        console.log("Collection 'albums' created");
                    })
                }
            });
        }
    });
}