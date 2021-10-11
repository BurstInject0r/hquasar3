const User = require('../models/user');
const bcrypt = require('bcrypt');

const sessionController = require('../controllers/sessionController');
Session = new sessionController();

class Login {
    index(req, res) {
        if (Session.redirectIfAuth(req, res)) {
            res.render('auth/login');
        }
    };

    login(req, res) {
        if (Session.redirectIfAuth(req, res)) {
            const {username, password, remember} = req.body;

            let data = {
                error: false,
                username: undefined,
                password: undefined,
                message: undefined
            }

            if (username.length === 0 || typeof username === undefined) {
                data.error = true;
                data.username = 'You need to enter a username';
            }
            if (password.length === 0) {
                data.error = true
                data.password = 'You need to enter a password'
            }

            if (!data.error) {
                const query = User.findOne({'username': new RegExp('^' + username + '$', "i")});
                query.exec((err, result) => {
                    if (result != null) {
                        if (bcrypt.compareSync(password, result.password)) {
                            req.session.user = {
                                id: result._id,
                                auth: true,
                            }

                            if (remember === 'on') {
                                req.session.cookie.maxAge = 60 * 60 * 24 * 30;
                            }

                            res.redirect('/');
                        } else {
                            data.message = 'Incorrect username or password';
                            res.render('auth/login', data);
                        }
                    } else {
                        data.message = 'Incorrect username or password';
                        res.render('auth/login', data);
                    }
                })
            } else {
                res.render('auth/login', data);
            }
        }
    }
}

module.exports = Login;