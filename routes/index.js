// GET ALl USers
// GET user by ID
// GET user by email
// ADD user
// update user

const router = require("./auth");


router.get("/", async (req, res) => {
    let page = null
    if (isloggedin()) {
        page = sendPersonalPage()
    }
    else {
        page = sendGuestPage()
    }

    res.sendFile(page)
})
// promise.....
// process with 1 thread*

// create promise class in JS web dev simplified