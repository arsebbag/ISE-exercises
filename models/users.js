//const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");

// create a schema
let userSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    //username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    rule: { type: String, required: true },

    created_at: Date,
    updated_at: Date
});

userSchema.statics.UPDATE = async function (id, user) {
    this.findOneAndUpdate({ _id: id },
        user, function (err) {
            if (err) {
                throw new Error("The id is not correct");
            }
        });
}

userSchema.pre('save', function (next) {
    // get the current date
    let currentDate = new Date();
    // change the updated_at field to current date
    this.updated_at = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});

module.exports = mongoose.model("user", userSchema)