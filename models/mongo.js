const mongoose = require("mongoose");
//var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://dbEx4:dbEx4password@cluster0.9irac.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { dbName: "projectflower" }, { useNewUrlParser: true });

// function getDB(callback) {
//     MongoClient.connect(uri, function (err, client) {
//         if (err) throw err;
//         var db = client.db("projectflower");
//         module.exports = col => db.collection(col);
//         callback();
//     });
// }
// module.exports = getDB;

//working

// MongoClient.connect(uri, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("projectflower");
//     dbo.collection("flowers").findOne({}, function (err, result) {
//         if (err) throw err;
//         console.log(result.name);
//         db.close();
//     });
// });

///////////////////////////////


