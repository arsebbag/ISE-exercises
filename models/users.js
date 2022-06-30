//const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");

// create a schema
let userSchema = new mongoose.Schema({
    name: { type: String },
    //username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    rule: { type: String },

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

module.exports = mongoose.model("user", userSchema)//, "users"
    //db.model('User', schema);



// var userDB = require('./mongo')("users");


// // C.R.U.D funcs

// async function addUser(user) {
//     console.log(user);
//     user.ID = await getNewID();
//     console.log(user);
//     userDB.insertOne(user);
// }

// function promoteUser(userID) {
//     let userToPromote = { ID: userID };
//     let newvalues = { $set: { userType: "manager" } };
//     userDB.updateOne(userToPromote, newvalues, function (err, res) {
//         if (err) throw err;
//         console.log("1 document updated");
//     });
// }


// function deleteUser(user) {
//     userDB.deleteOne({ ID: user.ID },
//         function (err, res) {
//             if (err) throw err;
//             console.log("1 document updated");
//         });
// }

// function getUserBy(key, value) {
//     qry = {}
//     qry[key] = value;
//     let returnUser = userDB.findOne(qry);
//     return returnUser;
// }

// async function getUsers() {
//     return (await userDB.find({ userType: { "$ne": "Developer" } })).toArray();
// }

// async function getNewID() {
//     let highestArray = userDB.find().project({ _id: 0, ID: 1 }).sort({ ID: -1 }).limit(1);
//     let highestID = await highestArray.toArray();
//     return highestID[0].ID + 1;
// }
// module.exports = {
//     addUser,
//     deleteUser,
//     promoteUser,
//     getUserBy,
//     getUsers
// };