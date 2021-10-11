class Session {
    checkLogin(req, res, next) {
        if (typeof req.session.user !== 'undefined') {
            if (req.session.user.auth) {
                next();
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect('/login');
        }
    }

    redirectIfAuth(req, res) {
        if (typeof req.session.user !== 'undefined') {
            if (req.session.user.auth) {
                res.redirect('/');
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    logout(req, res) {
        req.session.destroy(function (err) {
            res.redirect('/login');
        })
    }
}

module.exports = Session;