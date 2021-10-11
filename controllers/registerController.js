const User = require('../models/user')
const emailValidator = require('email-validator')
const bcrpyt = require('bcrypt')

const sessionController = require('../controllers/sessionController');
Session = new sessionController();

const inviteController = require('./inviteController');
Invite = new inviteController();

const userController = require('../controllers/userController');
Users = new userController;

class Register {
    index(req, res) {
        if (Session.redirectIfAuth(req, res)) {
            res.render('auth/register')
        }
    };

    register(req, res) {
        if (Session.redirectIfAuth(req, res)) {
            const {username, email, invite, password, password_confirm} = req.body;
            const regex = /^[a-zA-Z0-9]+$/;
            let data = {
                error: false,
                username: undefined,
                email: undefined,
                invite: undefined,
                password: undefined,
                password_confirm: undefined
            }

            Invite.checkInvite(invite, (checkInvite) => {
                if (!checkInvite.used) {
                    if (password.length === 0) {
                        data.error = true;
                        data.password = 'You need to enter a password';
                    } else {
                        if (password.length <= 8 || password.length >= 513) {
                            data.error = true;
                            data.password = 'Your password is not long enough'
                        }
                    }

                    if (typeof password === 'undefined' || password !== password_confirm) {
                        data.error = true;
                        data.password_confirm = 'Your passwords do not match';
                    }

                    if (email.length === 0) {
                        data.error = true;
                        data.email = 'You need to enter an email adress';
                    } else if (!emailValidator.validate(email)) {
                        data.error = true;
                        data.email = 'Your email is not valid';
                    }

                    if (username.length === 0) {
                        data.error = true;
                        data.username = 'You need to enter a username';
                    } else if (!regex.test(username)) {
                        data.error = true;
                        data.username = 'Your username can only contain: "a-z A-Z 0-9 and must be between 3-64 Chars';
                    }

                    let ip
                    if (process.env.TYPE === 'development') {
                        ip = req.connection.remoteAddress;
                    } else {
                        ip = req.headers['x-forwarded-for'];
                    }

                    if (!data.error) {
                        const hash = bcrpyt.hashSync(password, 8);
                        const register = new User({
                            username: username,
                            email: email,
                            password: hash,
                            usergroup_num: 1,
                            usergroup_str: 'User',
                            invited_by: checkInvite.invite.created_by_str,
                            registration_ip: ip,
                            registration_hostname: req.headers.host,
                            registration_useragent: req.get('user-agent'),
                            coins: 0
                        });
                        register.save()
                            .then(function () {
                                Users.userdataByName(username, (err, userdata) => {
                                    Invite.markInviteAsUsed(invite, username, userdata._id, () => {
                                        res.redirect('/login');
                                    });
                                })
                            })
                            .catch((error) => {
                                console.log(error)
                                if (error.code === 11000 && error.keyPattern.username === 1) {
                                    res.render('auth/register', {username: 'The username is already in use'});
                                }
                                if (error.code === 11000 && error.keyPattern.email === 1) {
                                    res.render('auth/register', {email: 'The email is already in use'});
                                }
                            })
                    } else {
                        res.render('auth/register', data);
                    }
                } else {
                    data.invite = 'The invite is not valid'
                    res.render('auth/register', data);
                }
            })
        }
    }
}

module.exports = Register;