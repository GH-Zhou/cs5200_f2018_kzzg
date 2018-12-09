const app = require('./express');
app.set('view engine', 'ejs');

const createDummyData = require("./createDummyData");

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session      = require('express-session');
const passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser('secret'));
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session()); // must be after session

app.get('/api/session', function (req, res) {
    console.log(req.session);
    res.send(req.session);
});

app.get('/api/session/:name/:value', function (req, res) {
    const name = req.params.name;
    const value = req.params.value;

    const obj = {
        name: value
    };

    req.session[name] = obj;

    console.log(req.session);
    res.send(req.session);
});



app.use(app.express.static(__dirname + '/front-end'));

require("./back-end/app");

createDummyData.createDummyUsers();


const port = process.env.PORT || 80;

app.listen(port);