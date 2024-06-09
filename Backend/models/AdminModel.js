const mongoose = require('mongoose');	

const adminSchema = mongoose.Schema({
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


module.exports = mongoose.model('Admin-fyp', adminSchema);