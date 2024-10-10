const LatestCarModel = require('../models/latest_CarModel');
const acceptCarModel = require('../models/Accepted_model');
const rejectCarModel = require('../models/Rejected_model');
const multer = require('multer')




// Configure Multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')  // Save files in 'uploads' directory
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)  // Use the date and original filename
    }
});

const upload = multer({ storage: storage });

//----------------AddModels-------------
// Latestmodel_controller.js
const AddModel = async (req, res) => {
    console.log("Execute the Add Models function");
    const { Stearing, Mirrors, Spoiler, Gear_knob, Car_model, Seats } = req.body;
    // const ImagePath = req.file;
    // console.log(req.body);
  
    try {
        const existingModel = await LatestCarModel.findOne({ Car_model });
        // if (existingModel) {
        //     return res.status(400).json({ message: 'Car already exists with this model ID' });
        // }

        // const imagePath = req.file ? req.file.path : null; // Handling if the image is not uploaded
       
        const newModel = new LatestCarModel({
            Stearing:Stearing,
            Mirrors: Mirrors,
            Spoiler: Spoiler,
            Gear_knob: Gear_knob,
            Car_model: Car_model,
            Seats:Seats
            // ImagePath: ImagePath
        });
        
        const model = await newModel.save();

        console.log(req.file);  // Check the file object
    console.log(req.body);  // Check other form data

        res.status(200).json({ message: 'Successfully added car', model });
    } catch (err) {
        res.status(400).json({ message: 'Error adding car', error: err });
    }
};

  



//------------Get all cars-------------

const getAllModels =async (req, res) => {
    console.log("Execute the get all cars models data");
    try{
            // const models = await LatestCarModel.find();
            const models = await LatestCarModel.find().sort({ _id: -1 }); // -1 for descending order
            console.log("Models returned from DB:", models); // Log the sorted models
            res.json(models);

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting cars" });
      }
};

//------------------Get Accepted cars------------
const getacceptModels =async (req, res) => {
    console.log("Execute the get all accepted cars models data");
    try{
            const accept_models = await acceptCarModel.find().sort({ _id: -1 });
            res.json(accept_models);
            console.log(accept_models);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting cars" });
      }
};

const getrejectModels =async (req, res) => {
    console.log("Execute the get all accepted cars models data");
    try{
            const reject_models = await rejectCarModel.find().sort({ _id: -1 });
            res.json(reject_models);
            console.log(reject_models);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting cars" });
      }
};

// Accept a car model
const Accept_CarModel = async (req, res) => {
    const { id } = req.params;
    const { comments } = req.body;
    console.log(req.body);
    console.log("Execute the Accept Car model function with ID", id);
    try {
        // Find the car model
        const carModel = await LatestCarModel.findById(id);
        if (!carModel) {
            console.log("Car model not found with ID:", id);
            return res.status(404).json({ message: 'Car model not found' });
        }

        // Create a new document in the accepted model collection
        const acceptedCar = new acceptCarModel({
            Car_model: carModel.Car_model,
            Stearing: carModel.Stearing,
            Mirrors: carModel.Mirrors,
            Spoiler: carModel.Spoiler,
            Seats: carModel.Seats,
            Gear_knob: carModel.Gear_knob,
            Comments: comments
        });
          // Update model's status and add comment
        carModel.status = 'accepted';
        acceptedCar.comments = comments; // Assuming `comment` field is part of the model schema
        const savedAcceptedCar = await acceptedCar.save();
        console.log("Accepted car saved:", savedAcceptedCar);

        // Remove from latest models
        const deleteModel = await LatestCarModel.findByIdAndDelete(id);

        console.log("Delete model attempt:", deleteModel);

        if (deleteModel) {
            console.log("Model deleted successfully:", deleteModel);
            return res.status(200).json({ message: 'Car model accepted and removed from latest models.', details: deleteModel });
        } else {
            console.log("No model found with ID after attempting delete:", id);
            return res.status(404).json({ message: 'Failed to delete model from latest models.' });
        }
    } catch (error) {
        console.error("Error accepting car model:", error);
        res.status(500).json({ message: 'Error accepting car model', error: error });
    }
};

// Reject a car model
const Reject_CarModel = async (req, res) => {
    const { id } = req.params;
    const { comments } = req.body;
    console.log(req.body);
     console.log("Execute the Rejeceted Car model function with ID", id);
    
    try {
        // Find the car model
        const carModel = await LatestCarModel.findById(id);
        if (!carModel) {
            console.log("Car model not found with ID:", id);
            return res.status(404).json({ message: 'Car model not found' });
            
        }
        
        // Create a new document in the accepted model collection
        const rejectedCar = new rejectCarModel({
            Car_model: carModel.Car_model,
            Stearing: carModel.Stearing,
            Mirrors: carModel.Mirrors,
            Spoiler: carModel.Spoiler,
            Seats: carModel.Seats,
            Gear_knob: carModel.Gear_knob,
            Comments: comments
        });

         
        carModel.status='Rejected';
        rejectedCar.comments= comments;
       const savedRejectedCar= await rejectedCar.save();
       console.log("Rejected car saved:", savedRejectedCar);

        // Remove from latest models
       const deletemodel= await LatestCarModel.findByIdAndDelete(id);
       if(deletemodel){
        console.log("Model deleted successfully:", deletemodel);
        return res.status(200).json({ message: 'Car model rejeceted and removed from latest models.', details: deletemodel });
       }
       else {
        console.log("No model found with ID after attempting delete:", id);
        return res.status(404).json({ message: 'Failed to delete model from latest models.' });
    }
    } catch (error) {
        res.status(500).json({ message: 'Error accepting car model', error });
    }
};


module.exports = { Accept_CarModel, Reject_CarModel, getAllModels, getacceptModels, getrejectModels, AddModel};
