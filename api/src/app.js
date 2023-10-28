const express = require("express");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

const db = require('./database/db');
const path = require("path");
const UserController = require("./controller/user_controller");

let port = 8800;

const Contact = require("./model/contact");
const temp_path = path.join(__dirname, "../views");
app.use(express.static(path.join(path.resolve(), "../../client")));
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs')
app.set('views', temp_path)

app.use(session({
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled',
    },
        function (err) {
            console.log(err || 'connct-mongodb setup ok');
        }),
    secret: 'blahsomething',
    resave: false,
    saveUninitialized: false,

}));



app.get('/', (req, res) => {
    res.render('index', { isLoggedIn: req.session?.isLoggedIn, error: false });
});

app.get('/registration', (req, res) => {
    res.render('registration', { isLoggedIn: true, error: false });
});

app.get('/login', (req, res) => {
    res.render('login', { isLoggedIn: false, error: false });
});

app.get('/course', (req, res) => {
    res.render('course', { isLoggedIn: req.session?.isLoggedIn });
});

app.get('/contact', (req, res) => {
    res.render('contact', { isLoggedIn: req.session?.isLoggedIn, error: false });
});

app.get('/team', (req, res) => {
    res.render('ourTeam', { isLoggedIn: req.session?.isLoggedIn, error: false });
});

// registration
app.post('/registration', UserController.registration);

// login
app.post('/login', UserController.login);


//logout
app.post('/logout', UserController.logout);

// contact
app.post('/contact', async (req, res) => {
    try {

        const contact = new Contact(req.body);

        const postData = await contact.save();
        res.redirect('back');

    } catch (err) {
        res.send(err);
    }
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
