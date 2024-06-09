const mongoose = require('mongoose');	

const UserSchema = mongoose.Schema({
    firstname:{
        required: true,
        type: String
    },
    lastname:{
        required: true,
        type: String
    },
    email:{
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String
    },
    username:{
        required: true,
        type: String
    }
})


module.exports = mongoose.model('User-fyp', UserSchema);