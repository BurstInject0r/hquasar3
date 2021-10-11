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
            res.render('account/settings/general', {user: userdata, sitedata: {selected: 'account', selectedSettings: 'General Settings'}});
        })
    }

    emailSettings(req, res) {
        Users.userdata(req.session.user.id, (userdata) => {
            res.render('account/settings/email', {user: userdata, sitedata: {selected: 'account', selectedSettings: 'Email Settings'}});
        })
    }

    passwordSettings(req, res) {
        Users.userdata(req.session.user.id, (userdata) => {
            res.render('account/settings/password', {user: userdata, sitedata: {selected: 'account', selectedSettings: 'Password Settings'}});
        })
    }
}

module.exports = Account;