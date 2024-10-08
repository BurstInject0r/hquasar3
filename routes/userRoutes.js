const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/sessionController');
Session = new sessionController();

const inviteController = require('../controllers/inviteController');
Invite = new inviteController();

const accountController = require('../controllers/accountController');
Account = new accountController();


router.get('/account/overview', Account.index);
router.get('/account/settings/general', Account.generalSettings);
router.get('/account/settings/email', Account.emailSettings);
router.get('/account/settings/security', Account.securitySettings);
router.get('/account/logout', Session.logout);
router.get('/account/invites', Invite.index);
router.get('/account/invites/create', Invite.create);

router.post('/account/settings/change_password', Account.changePassword)


module.exports = router;