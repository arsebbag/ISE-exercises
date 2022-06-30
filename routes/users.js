var express = require('express');
const { default: mongoose } = require('mongoose');
var router = express.Router();
const users = require('../jsons/users.json')

userModel = require('../models/users');
mongooseDb = require('../models/mongo');

// router.get("/", async (req, res) => {
//     return await getUsers()
// })
// router.get("/insert", async (req, res) => {
//     return await getUsers()
// })
var conn = mongoose.connection;

//C.R.U.D operations
router.get('/insert', async (req, res) => {
    res.send("in new route\n");

    await userModel.create({
        name: "insert",
        username: "asebbag",
        password: "1234",
        rule: "manager"
    })
})

router.get('/find', async (req, res) => {
    //res.send("in new route");

    await userModel.find({}).exec((err, user) => {
        console.log(user)
        res.send(user)
    });
})

router.get('/delete/:id', async (req, res) => {

    await userModel.deleteOne({ _id: id }).exec((err, user) => {
        if (err) throw err;
        console.log("1 document deleted");
        console.log(user)
    });
})

router.get('/update/:id', async (req, res) => {

    await userModel.updateOne({ _id: id }, { $set: { name: "Mickey" } }).exec((err, user) => {
        if (err) throw err;
        console.log("1 document deleted");
        console.log(user)
    });
})

// router.get('/', (req, res) => {
//     let temp = {}
//     let password = req.params.password;
//     let username = req.params.user;
//     for (let key in users) {
//         temp = users[key]
//         if (key == username && temp["password"] == password) {
//             let rule = temp["rule"];
//             if (rule == "admin") {
//                 res.sendFile(path.join(dirViews + "/admin.html"));
//             }
//             else if (rule == "employee") {
//                 res.sendFile(path.join(dirViews + "/employee.html"));
//             }
//             else if (rule == "customer") {
//                 res.sendFile(path.join(dirViews + "/customer.html"));
//             }
//             else if (rule == "Vendor") {
//                 res.sendFile(path.join(dirViews + "/vendor.html"));
//             }
//             return;
//         }
//     }
//     res.status(404);
// })

router.get('/users/:username/:password', (req, res) => {
    let isNotUser = true
    let temp = {}
    let password = req.params.password;
    let username = req.params.username;

    for (let key in users) {
        temp = users[key]
        if (key == username && temp["password"] == password) {
            let rule = temp["rule"];
            //console.log(key)
            if (rule == "admin" || rule == "employee") {
                isNotUser = false
            }
        }
    }
    if (isNotUser) {
        return
    }

    let i = 0;
    let jsonAdminUsers = {}

    for (let key in users) {
        //console.log(key)
        let nestedJson = {}
        let rule = users[key]["rule"];
        nestedJson["rule"] = rule;
        nestedJson["password"] = users[key]["password"]
        nestedJson["username"] = key
        jsonAdminUsers[i.toString()] = nestedJson;
        ++i;
    }
    res.json(JSON.stringify(jsonAdminUsers));
    //console.log(JSON.stringify(jsonAdminUsers))
})

router.get('/addUser /: username /: password /: rule /: newPassword /: newUsername', async (req, res) => {
    let isNotUser = true
    let temp = {}
    let password = req.params.password;
    let username = req.params.username;
    let rule = req.params.rule;
    //console.log(password)
    //console.log(username)
    //console.log(rule)
    let admin = false
    for (let key in users) {
        temp = users[key]
        if (key == username && temp["password"] == password) {
            let rule = temp["rule"];
            if (rule == "admin") {
                isNotUser = false
                admin = true
            }
            if (rule == "employee") {
                isNotUser = false
            }
        }
    }
    if (isNotUser) {
        return
    }
    if (!admin) {
        if (rule == "admin") {
            return;
        }
    }
    let newPassword = req.params.newPassword;
    let newUsername = req.params.newUsername;
    if (newPassword == null || newUsername == null || rule == null) {
        return;
    }
    if (!(rule == "admin" || rule == "employee" || rule == "customer" || rule == "Vendor")) {
        return;
    }
    let j = {}
    j["rule"] = rule
    j["password"] = newPassword
    //console.log(j)
    users[newUsername] = j
    //console.log(users)
    fs.writeFileSync("./users.json", JSON.stringify(users))
})

router.get('/removeUser/:username/:password/:Username', async (req, res) => {
    let isNotUser = true
    let temp = {}
    let password = req.params.password;
    let username = req.params.username;
    console.log(password)
    console.log(username)
    //console.log(rule)
    for (let key in users) {
        temp = users[key]
        if (key == username && temp["password"] == password) {
            let rule = temp["rule"];
            if (rule == "admin") {
                isNotUser = false
            }
        }
    }
    if (isNotUser) {
        return
    }
    let Username = req.params.Username;
    delete users[Username];
    console.log("removed")
    fs.writeFileSync("./users.json", JSON.stringify(users))
})

module.exports = router;