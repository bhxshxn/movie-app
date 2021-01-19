const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const authenticateUser = require('../middlewares/authenticateUser');
const User = require('../models/user');
const fav = require('../models/fav');
const watch =require('../models/watch');

//get login
router.get('/login', (req, res) => {
    res.render('user/login', { user:null });
});

//get register
router.get('/register', (req, res) => {
    res.render('user/register',{user:null});
});

//post register
router.post("/register", async (req, res) => {
    const { email, password, username } = req.body;
    // check for missing filds
    if (!email || !password || !username) {
        res.render('user/register', { user: req.session.user, msg: "Please enter all the fields" })
        return;
    };
    var user = username.charAt(0).toUpperCase() + username.slice(1);

    const doesUserExitsAlreay = await User.findOne({ email });
    if (doesUserExitsAlreay) {
        res.render('user/register', { user: req.session.user, msg: "Email already exists" });
        return;
    };

    const doesUsernameExitsAlreay = await User.findOne({ username: user });
    if (doesUsernameExitsAlreay) {
        res.render('user/register', { user: req.session.user, msg: "Username already exists" });
        return;
    };

    // lets hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    const latestUser = new User({ email, password: hashedPassword, username: user });

    latestUser
        .save()
        .then(() => {
            res.render('user/login');
            return;
        })
        .catch((err) => console.log(err));
});

//post for login
router
    .post("/login", async (req, res) => {
        var { username, password } = req.body;

        // check for missing filds
        if (!username || !password) {
            res.send("Please enter all the fields");
            return;
        }
        username = username.charAt(0).toUpperCase() + username.slice(1);
        const doesUserExits = await User.findOne({ username });

        if (!doesUserExits) {
            res.render('user/login', { user: req.session.user, page: "login", msg: "Invalid useranme or password" }); return;
        }

        const doesPasswordMatch = await bcrypt.compare(
            password,
            doesUserExits.password
        );

        if (!doesPasswordMatch) {
            res.render('user/login', { user: req.session.user, page: "login", msg: "Invalid useranme or password" });
            return;
        }

        // else he\s logged in
        req.session.user = username;
        // console.log(req.session.user);
        res.redirect('/');
    })

//logout
router.get("/logout", authenticateUser, (req, res) => {
    req.session.user = null;
    res.redirect("/");
});

//get fav
router.get('/fav', authenticateUser,async (req, res) => {
    const data= await fav.find({user: req.session.user });
    res.render('user/favourites', { user: req.session.user,fav:data });
});

//get watchlist
router.get('/wish', async(req, res) => {
    const data = await watch.find({user:req.session.user});
    res.render('user/watchlist', { user: req.session.user,watch:data });
});

//fav add
router.get('/fav/:id/:date',authenticateUser, async(req, res) => {
    const latestFav = new fav({ title:req.params.id, year: req.params.date, user: req.session.user });
    await latestFav
        .save()
        .then(() => {
            res.redirect('back');
            return;
        })
        .catch((err) => console.log(err));
});

// wish add
router.get('/wish/:id/:date',async (req, res) => {
    const latestWatch = new watch({ title:req.params.id, year: req.params.date, user: req.session.user });
    await latestWatch
        .save()
        .then(() => {
            res.redirect('back');
            return;
        })
        .catch((err) => console.log(err));
});
module.exports = router;