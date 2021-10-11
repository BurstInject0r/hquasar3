const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'You need to enter a username!'],
        minlength: [3, 'Your username needs to be beetween 3-64 Chars long!'],
        maxlength: [64, 'Your username needs to be beetween 3-64 Chars long!'],
    },
    email: {
        type: String,
        maxlength: [255, 'Your email is too long (Max 255 Chars']
    },
    password: {
        type: String,
        required: true,
    },
    usergroup_num: {
        type: Number,
        required: true,
    },
    usergroup_str: {
        type: String,
        required: true
    },
    invited_by: {
        type: String,
        required: true,
    },
    registration_ip: {
        type: String,
        required: true
    },
    registration_hostname: {
        type: String,
        required: true
    },
    registration_useragent: {
        type: String,
        required: true
    },
    coins: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const User = mongoose.model('user', userSchema);

module.exports = User;