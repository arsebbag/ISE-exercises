var express = require('express');
var router = express.Router();
const path = require('path');
var users = require("../jsons/users.json")
userModel = require('../models/users');
const fs = require('fs');

const dirViews = __dirname + '/views';
const dirImages = __dirname + '/images';

router.post("/", async (req, res) => {
    //console.log(req.xhr)
    if (req.body && req.body.password && req.body.username &&
        req.body.password.length >= 6 && req.body.username.length >= 5) {

        //return just one!
        const user1 = await userModel.findOne({
            name: req.body.username, password: req.body.password
        })
        let password = req.body.password;
        let username = req.body.username;
        //let rule = user1.rule;
        //console.log(username);

        if (user1.name == username && user1.password == password) {
            console.log(user1.name);

            const obj = {}
            let reqPath = path.join(__dirname, '../');
            console.log(reqPath);
            const html = fs.readFileSync(path.join(reqPath + "/views/admin.html"));
            return res.json({ html: html.toString(), data: obj });

            // if (rule == "admin") {
            //     console.log(dirViews);
            //     res.sendFile(path.join("C:\\ISE-Summer\\FlowerShopWebsite-main\\FlowerShopWebsite-main/views" + "/admin.html"));
            // }
            // else if (rule == "employee") {
            //     console.log("em");
            //     res.sendFile(path.join(dirViews + "/employee.html"));
            // }
            // else if (rule == "customer") {
            //     console.log("cus");
            //     res.sendFile(path.join(dirViews + "/customer.html"));
            // }
            // else if (rule == "Vendor") {
            //     console.log("ve");
            //     res.sendFile(path.join(dirViews + "/vendor.html"));
            // }
            // return;
            // //  }
        }
    }
    else
        return res.status(422).json({ success: false, message: "You sent a bad entity or crednials are incorrect." })
    // add user and create cookie for user and send it back.
})

module.exports = router;

// in user.json

// [
//     {
//         "name": "Yossi",
//         "rule": "admin",
//         "password": "admin1234"
//     },
//     {
//         "name": "Motti",
//         "rule": "employee",
//         "password": "mottiZin12345"
//     },
//     {
//         "name": "Kobe",
//         "rule": "customer",
//         "password": "9i0i9878"
//     },
//     {
//         "name": "Paul",
//         "rule": "Vendor",
//         "password": "91u912u19"
//     },
//     {
//         "name": "asafdavi",
//         "rule": "admin",
//         "password": "54345"
//     },
//     {
//         "name": "moshe",
//         "rule": "Vendor",
//         "password": "66465"
//     },
//     {
//         "name": "Ariel",
//         "rule": "admin",
//         "password": "34324fdssdfs"
//     }
// ]