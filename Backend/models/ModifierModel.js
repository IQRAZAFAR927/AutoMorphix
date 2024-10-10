const mongoose = require('mongoose');	

const ModifierSchema = mongoose.Schema({
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
    },
    role: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Modifier-fyp', ModifierSchema);