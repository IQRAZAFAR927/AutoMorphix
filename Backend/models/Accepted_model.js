const mongoose = require('mongoose');	

const Accept_CarModelSchema = mongoose.Schema({
    Car_model:{
        required:true,
        type:String
    },
    Stearing:{
        required: false,
        type: String
    },
    Mirrors:{
        required: false,
        type: String
    },
    Spoiler:{
        required: false,
        type: String
    },
    Seats:{
        required: false,
        type: String
    },
    Gear_knob:{
        required: false,
        type:String
    },
    Comments:{
        required:false,
        type:String
    }

    // ImagePath: {  // Add this line
    //     required: false,
    //     type: String
    // }
})


module.exports = mongoose.model('Accept-CarModel', Accept_CarModelSchema);