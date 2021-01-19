const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


router.use('/user', require('./user.js'));

//index route
router.get('/', (req, res) => {
    fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=a33884be03d605cb8f62d56425984d90')
        .then(res => res.json())
        .then(json => {
            res.render('main/home', { db: json.results, user: req.session.user })
        });
});

//data
router.get('/data', (req, res) => {
    fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=a33884be03d605cb8f62d56425984d90')
        .then(res => res.json())
        .then(json => {
            res.send(json.results[0])

        });

});

//search
router.post('/search', (req, res) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=a33884be03d605cb8f62d56425984d90&language=en-US&query=${req.body.movname}&page=1&include_adult=true`)
        .then(res => res.json())
        .then(json => {
            res.render('main/home', { db: json.results, user: req.session.user })
        });
});


module.exports = router;