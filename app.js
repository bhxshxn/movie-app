const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const viewsPath = path.join(__dirname, './views');

app.use('/', require('./routes/index'));
app.set("view engine", "ejs");
app.set('views', viewsPath);
app.use(express.urlencoded({ extened: true }));
app.use(express.static('public'));

// server
app.listen(port, () => {
    console.log(`App is running at:http://localhost:${port}/`);
});