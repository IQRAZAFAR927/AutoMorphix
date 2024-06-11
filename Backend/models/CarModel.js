const mongoose = require('mongoose');	

const CarSchema = mongoose.Schema({
    Brand:{
        required: true,
        type: String
    },
    Model:{
        required: true,
        type: String
    },
    Year:{
        required: true,
        type: Number
    },
    Register_num:{
        required: true,
        type: String
    },
    ImagePath: {  // Add this line
        required: true,
        type: String
    }
})


module.exports = mongoose.model('Car-fyp', CarSchema);