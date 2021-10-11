const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({
    secret: '27145a9698be93b07ab176f744cdb2f4179b70c8859f390620d7d776c8d8ae61',
    resave: false,
    saveUninitialized: true
}));

module.exports = session();