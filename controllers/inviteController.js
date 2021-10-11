const Invite = require('../models/invite');
const User = require('../models/user');

const userController = require('./userController');
Users = new userController();


const randomstring = require("randomstring");
const sha1 = require('sha1');

class Invitation {
    index(req, res) {
        Users.userdata(req.session.user.id, (userdata) => {
            const query = Invite.find({'created_by_id': req.session.user.id})
            query.exec((err, invites) => {
                res.render('account/invites', {user: userdata, sitedata: {selected: 'invites'}, invites: invites})
            })
        })
    }

    create(req, res) {
        const code = sha1(randomstring.generate(64))
        User.findById(req.session.user.id, (err, result) => {
            const invite = new Invite({
                invite: code,
                created_by_str: result.username,
                created_by_id: req.session.user.id,
                used_by_str: '',
                used_by_id: '',
                used: false
            });
            invite.save()
                .then(res.send('OK'))
        })
    }

    checkInvite(req, res, callback) {
        const query = Invite.findOne({'invite': invite, 'used': false});
        query.exec((err, result) => {
            if (result !== null) {
                callback({used: false, invite: result});
            } else {
                callback({used: true});
            }
        })
    }

    markInviteAsUsed(req, res, callback) {
        const query = Invite.findOneAndUpdate({invite: invite}, {used_by_str: username, used_by_id: userid, used: true});
        query.exec((err, result) => {
            callback();
        });
    }
}
module.exports = Invitation;