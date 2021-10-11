const userController = require('./userController');
Users = new userController();

class Home {
    index(req, res) {
        Users.userdata(req.session.user.id, (userdata) => {
            res.render('index', {user: userdata, sitedata: {selected: 'home'}});
        })
    }

    viewProfile(req, res) {
        const username = req.params.username;
        Users.userdata(req.session.user.id, (userdata) => {
            Users.userdataByName(username, (err, result) => {
                if (result !== null) {
                    res.render('main/profile', {user: userdata, sitedata: {selected: ''}, profile: result})
                } else {
                    res.render('misc/404')
                }
            })
        })
    }
}


module.exports = Home;