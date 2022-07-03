var express = require('express');
const { default: mongoose } = require('mongoose');
var router = express.Router();
userModel = require('../models/users');
mongooseDb = require('../models/mongo');

var conn = mongoose.connection;

//C.R.U.D operations
router.route('/insert').post(async (req, res) => {
    let name = req.body.name
    let password = req.body.password
    let rule = req.body.rule
    let usermodel = new userModel({ name, password, rule })
    await usermodel.save().then(() => res.json("User inserted"))

})

router.get('/find', async (req, res) => {
    //res.send("in new route");

    await userModel.find({}).exec((err, user) => {
        console.log(user)
        res.send(user)
    });
})

router.route("/delete/:username").delete((req, res) => {
    userModel.deleteOne({ "name": req.params.username })
        .then(() => res.json("user deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});


router.get('/update/:id', async (req, res) => {

    await userModel.updateOne({ _id: id }, { $set: { name: "Mickey" } }).exec((err, user) => {
        if (err) throw err;
        console.log("1 document deleted");
        console.log(user)
    });
})

//get all users from DB
router.route('/').get((req, res) => {
    userModel.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json("Error: " + err));
})

module.exports = router;