require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

const sessionController = require('./controllers/sessionController');
Session = new sessionController();

const userController = require('./controllers/userController');
Users = new userController();

const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const userRoutes = require('./routes/userRoutes');

//Connect to mongodb and start server
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true})
    .then((result) => {
        console.log('Connected to MongoDB')
        app.listen(process.env.SERVER_PORT, () => {
            console.log('Started listening for requests on port', process.env.SERVER_PORT);
        });
    })
    .catch((error) => console.log(error));

// registering view engine
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: '27145a9698be93b07ab176f744cdb2f4179b70c8859f390620d7d776c8d8ae61',
    resave: false,
    saveUninitialized: true
}));

//routes for not logged in users
app.use('/', authRoutes);

//check if user is logged in
app.use(Session.checkLogin);

//check if user is banned
app.use(Users.isBanned)


//routes for logged in users
app.use('/', userRoutes);
app.use('/', homeRoutes);

//404 page
app.use((req, res) => {
    res.status(404).render('misc/404');
})