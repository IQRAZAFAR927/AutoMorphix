const mongoose = require('mongoose');	

const LatestCarModelSchema = mongoose.Schema({
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
    }
    // ImagePath: {  // This line should be included correctly
    //     required: false,
    //     type: String
    // }
})


module.exports = mongoose.model('Latest-CarModel', LatestCarModelSchema);