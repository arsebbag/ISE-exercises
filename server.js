const { dir } = require('console');
const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//const cors = require("cors");

const app = express();
const router = express.Router();

var favicon = require('serve-favicon')
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.set('views', path.join(__dirname, 'views'));
const dirViews = __dirname + '/views';
const dirImages = __dirname + '/images';

const users = require('./jsons/users')
const flowersRoutes = require('./routes/flowers')

app.use('/images', express.static('images'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));
//app.use(cors);
const fs = require("fs");


router.get('/', function (req, res) {
  res.sendFile(path.join(dirViews + '/index.html'));
});

//******SET Routes********

function setRouter(route, router) {
  app.use(route, require(router));
}
setRouter("/auth", './routes/auth');
setRouter("/insertUser", './routes/users');
setRouter("/findMe", './routes/users');
setRouter("/login/:user/:password", './routes/users');// check if its good
setRouter("/users/:username/:password", './routes/users');// check if its good

setRouter("/addUser /: username /: password /: rule /: newPassword /: newUsername", './routes/users');// check if its good
setRouter("/removeUser/:username/:password/:Username", './routes/users');// check if its good

router.get('logout', (req, res) => {
  path.join(dirViews + '/index.html')
})

//add the router
app.use('/', router);

app.listen(process.env.port || 3000);

console.log('Running at Port 3000');

module.exports = app;

// app.use("/auth", './routes/auth');
// app.use("/insertUser", './routes/users');
// app.use("/findMe", './routes/users');
// app.use("/login/:user/:password", './routes/users');
// app.use("/users/:username/:password", './routes/users');
// app.use("/addUser /: username /: password /: rule /: newPassword /: newUsername", './routes/users');
// app.use("/removeUser/:username/:password/:Username", './routes/users');

// function setControllers() {
//   setRouter('/', './routes/index');
//   setRouter('/users', './routes/users');
//   setRouter("/ addUser /: username /: password /: rule /: newPassword /: newUsername", './routes/users');// check if its good
//   setRouter("/removeUser/:username/:password/:Username", './routes/users');// check if its good

//   //setRouter('/branches', './routes/branch');
//   setRouter('/flowers', './routes/flowers');
//   //setRouter('/orders', './routes/orders');
//   //setRouter('/cart', './routes/cart');
//   //setErrHandling();
//   app.emit('ready');
// }
// require('./models/mongo')(setControllers);

//setRouter('/', './routes/index');
//setRouter('/users', './routes/users');

// const userRouter = require("./routes/users")
// app.use('/', userRouter);


//setRouter("/auth", "./routes/auth")

//app.use('/flowers', flowersRoutes);

//**************

// router.get('/login/:user/:password', (req, res) => {
//   let temp = {}
//   let password = req.params.password;
//   let username = req.params.user;
//   for (let key in users) {
//     temp = users[key]
//     if (key == username && temp["password"] == password) {
//       let rule = temp["rule"];
//       if (rule == "admin") {
//         res.sendFile(path.join(dirViews + "/admin.html"));
//       }
//       else if (rule == "employee") {
//         res.sendFile(path.join(dirViews + "/employee.html"));
//       }
//       else if (rule == "customer") {
//         res.sendFile(path.join(dirViews + "/customer.html"));
//       }
//       else if (rule == "Vendor") {
//         res.sendFile(path.join(dirViews + "/vendor.html"));
//       }
//       return;
//     }
//   }
//   res.status(404);
// })


// router.get('/users/:username/:password', (req, res) => {
//   let isNotUser = true
//   let temp = {}
//   let password = req.params.password;
//   let username = req.params.username;

//   for (let key in users) {
//     temp = users[key]
//     if (key == username && temp["password"] == password) {
//       let rule = temp["rule"];
//       //console.log(key)
//       if (rule == "admin" || rule == "employee") {
//         isNotUser = false
//       }
//     }
//   }
//   if (isNotUser) {
//     return
//   }

//   let i = 0;
//   let jsonAdminUsers = {}

//   for (let key in users) {
//     //console.log(key)
//     let nestedJson = {}
//     let rule = users[key]["rule"];
//     nestedJson["rule"] = rule;
//     nestedJson["password"] = users[key]["password"]
//     nestedJson["username"] = key
//     jsonAdminUsers[i.toString()] = nestedJson;
//     ++i;
//   }
//   res.json(JSON.stringify(jsonAdminUsers));
//   //console.log(JSON.stringify(jsonAdminUsers))
// })



// router.get('/addUser/:username/:password/:rule/:newPassword/:newUsername', (req, res) => {
//   let isNotUser = true
//   let temp = {}
//   let password = req.params.password;
//   let username = req.params.username;
//   let rule = req.params.rule;
//   //console.log(password)
//   //console.log(username)
//   //console.log(rule)
//   let admin = false
//   for (let key in users) {
//     temp = users[key]
//     if (key == username && temp["password"] == password) {
//       let rule = temp["rule"];
//       if (rule == "admin") {
//         isNotUser = false
//         admin = true
//       }
//       if (rule == "employee") {
//         isNotUser = false
//       }
//     }
//   }
//   if (isNotUser) {
//     return
//   }
//   if (!admin) {
//     if (rule == "admin") {
//       return;
//     }
//   }
//   let newPassword = req.params.newPassword;
//   let newUsername = req.params.newUsername;
//   if (newPassword == null || newUsername == null || rule == null) {
//     return;
//   }
//   if (!(rule == "admin" || rule == "employee" || rule == "customer" || rule == "Vendor")) {
//     return;
//   }
//   let j = {}
//   j["rule"] = rule
//   j["password"] = newPassword
//   //console.log(j)
//   users[newUsername] = j
//   //console.log(users)
//   fs.writeFileSync("./users.json", JSON.stringify(users))
// })

// router.get('/removeUser/:username/:password/:Username', (req, res) => {
//   let isNotUser = true
//   let temp = {}
//   let password = req.params.password;
//   let username = req.params.username;
//   console.log(password)
//   console.log(username)
//   //console.log(rule)
//   for (let key in users) {
//     temp = users[key]
//     if (key == username && temp["password"] == password) {
//       let rule = temp["rule"];
//       if (rule == "admin") {
//         isNotUser = false
//       }
//     }
//   }
//   if (isNotUser) {
//     return
//   }
//   let Username = req.params.Username;
//   delete users[Username];
//   console.log("removed")
//   fs.writeFileSync("./users.json", JSON.stringify(users))
// })
