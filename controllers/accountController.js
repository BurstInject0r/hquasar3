User = require('../models/user');

const bcrypt = require('bcrypt');

const userController = require('./userController');
Users = new userController();

class Account {
    index(req, res) {
        Users.userdata(req.session.user.id, (userdata) => {
            res.render('account/index', {user: userdata, sitedata: {selected: 'account'}});
        })
    };

    generalSettings(req, res) {
        Users.userdata(req.session.user.id, (userdata) => {
            res.render('account/settings/general', {
                user: userdata,
                sitedata: {selected: 'account', selectedSettings: 'General Settings'}
            });
        })
    }

    emailSettings(req, res) {
        Users.userdata(req.session.user.id, (userdata) => {
            res.render('account/settings/email', {
                user: userdata,
                sitedata: {selected: 'account', selectedSettings: 'Email Settings'}
            });
        })
    }

    securitySettings(req, res) {
        Users.userdata(req.session.user.id, (userdata) => {
            res.render('account/settings/security', {
                user: userdata,
                sitedata: {selected: 'account', selectedSettings: 'Security Settings'}
            });
        })
    }

    changePassword(req, res) {
        const {password, new_password, confirm_password} = req.body
        let checkFields = true;

        if (password.length <= 0 || new_password.length <= 0 || confirm_password.length <= 0) {
            res.send({error: true, errorMessage: 'Please fill out all fields'})
            checkFields = false;
        }

        if (checkFields) {
            Users.userdata(req.session.user.id, (userdata) => {
                const query = User.findById(req.session.user.id);
                query.exec(async (error, result) => {
                    if (bcrypt.compareSync(password, result.password)) {
                        if (new_password === confirm_password) {
                            let hasError = false;
                            let errorMessage;

                            if (new_password.length <= 8 || new_password.length >= 513) {
                                hasError = true;
                                errorMessage = 'Your password is not long enough';
                            }

                            if (password === new_password) {
                                hasError = true;
                                errorMessage = 'Your new password needs to be different than your old password!';
                            }

                            if (hasError) {
                                res.send({error: hasError, errorMessage: errorMessage})
                            } else {
                                const hash = bcrypt.hashSync(new_password, 8);
                                const test = await User.updateOne({_id: result._id}, {password: hash});

                                res.send({error: false, message: 'Changed Password!'});

                            }
                        } else {
                            res.send({error: true, errorMessage: 'Your new passwords are not matching!'})
                        }
                    } else {
                        res.send({error: true, errorMessage: 'Your current password is not correct!'})
                    }
                })
            })
        }
    }
}

module.exports = Account;