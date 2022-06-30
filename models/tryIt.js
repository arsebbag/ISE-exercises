var userDB = require('./mongo')("flowers");


function getUserBy() {

    let returnUser = userDB.findOne({}, function (err, result) {
        if (err) throw err;
        //console.log(result.name);
        db.close();
    });
    return returnUser;
}

module.exports = {
    getUserBy
};