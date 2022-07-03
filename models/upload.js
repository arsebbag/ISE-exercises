const mongoose = require("mongoose");

// create a schema to upload file
let uploadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    file:
    {
        data: Buffer,
        contentType: String
    },
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model("upload", uploadSchema)