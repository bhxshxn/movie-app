const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const viewsPath = path.join(__dirname, './views');
const mongoose = require('mongoose');
const session = require('express-session');



//session
app.use(session({
    secret: 'keyboard cat',
}));

app.use(express.urlencoded({ extened: true }));
app.use('/', require('./routes/index'));
app.set("view engine", "ejs");
app.set('views', viewsPath);
app.use(express.static('public'));




// mongo Connection
const url = "mongodb+srv://bhxshxn:bhxshxn@9@cluster0.ixoza.mongodb.net/MovietretryWrites=true&w=majority"
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,

})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database is connected successfully on port 27017!!!');
});

// server
app.listen(port, () => {
    console.log(`App is running at:http://localhost:${port}/`);
});