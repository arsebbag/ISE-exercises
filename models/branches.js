const mongoose = require("mongoose");

// create a schema
let branchesSchema = new mongoose.Schema({
    name: String,
    ID: { type: Number, required: true, unique: true, index: true },
    address: String,
    active: Boolean,

    created_at: Date,
    updated_at: Date
}, { autoIndex: false });


module.exports = mongoose.model("user", branchesSchema)