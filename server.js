const { dir } = require('console');
const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//const cors = require("cors");

const app = express();
const router = express.Router();

//Favicon
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

//******Set Routes********

function setRouter(route, router) {
  app.use(route, require(router));
}
setRouter("/auth", './routes/auth');
setRouter("/user", './routes/users');
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

