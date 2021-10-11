const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inviteSchema = new Schema({
    invite: {
        type: String,
    },
    created_by_str: {
        type: String,
    },
    created_by_id: {
        type: String,
    },
    used_by_str: {
        type: String
    },
    used_by_id: {
        type: String,
    },
    used: {
        type: Boolean,
    }
}, {timestamps: true});

const Invite = mongoose.model('invite', inviteSchema);
module.exports = Invite;