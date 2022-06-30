const mongoose = require('mongoose');

const flowerSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    nameflower: String
});

module.exports = mongoose.model('flower', flowerSchema)