const User = require('../models/user');

class Users {
    userdata(id, callback) {
        const query = User.findById(id);
        query.exec((err, result) => {
            callback(result);
        })
    }

    userdataByName(username, callback) {
        const query = User.findOne({'username': new RegExp('^' + username + '$', "i")});
        query.exec((err, result) => {
            callback(err, result);
        })
    }

    isBanned(req, res, next) {
        const query = User.findById(req.session.user.id);
        query.exec((err, result) => {
            if (result.usergroup_num === 0) {
                res.render('misc/banned');
            } else {
                next()
            }
        })
    }
}

module.exports = Users;