const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
Home = new homeController();

router.get('/', Home.index);
router.get('/user/:username', Home.viewProfile)
router.get('/test', (req, res) => {
    res.render('test/test.ejs')
})
module.exports = router;