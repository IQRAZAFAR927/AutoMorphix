const Car= require('../models/CarModel');
const jwt = require('jsonwebtoken')
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
// app.post('/car/addcar', upload.single('Imagepath'), (req, res) => {
//   const { model, brand, year, registrationNumber } = req.body;
//   const ImagePath = req.file ? req.file.path : '';

//   if (!model || !brand || !year || !registrationNumber || !ImagePath) {
//     return res.status(400).send({ message: 'All fields are required' });
//   }

//   // Mock database save function
//   const newCar = {
//     model,
//     brand,
//     year,
//     registrationNumber,
//     ImagePath: ImagePath
//   };

//   // Here, you would save the newCar to your database
//   console.log(newCar);

//   res.status(200).send({ message: 'Car added successfully' });
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

// // Endpoint to handle file uploads
// app.post('/upload', upload.single('carImage'), (req, res) => {
//     const carData = new Car({
//         Brand: req.body.Brand,
//         Model: req.body.Model,
//         Year: req.body.Year,
//         Register_num: req.body.Register_num,
//         ImagePath: req.file.path  // Save the path of the uploaded file
//     });

//     carData.save()
//         .then(result => res.send(result))
//         .catch(err => res.status(400).send(err.message));
// });




//-------------------Add Car------------------

  const AddCar = (req, res) => {
    console.log("Execute the Add Car Function");
    const { Brand, Model, Year, Register_num } = req.body;
    const ImagePath = req.file.path;
    console.log(req.body);

    if (!Brand || !Model || !Year || !Register_num || !ImagePath) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    // Check if the car with the given registration number already exists
    Car.findOne({ Register_num: Register_num }).then((car) => {
      if (car) {
        res.status(400).send({ message: 'Car already exists with this Register number' });
        return;
      }
      const newCar = new Car({
        Brand: Brand,
        Model: Model,
        Year: Year,
        Register_num: Register_num,
        ImagePath: ImagePath
        
      });

      newCar
        .save()
        .then((car) => {
          res.status(200).send({
            message: 'Successfully added car',
            car: car,
          });
        })
        .catch((err) =>
          res.status(400).send({ message: 'Error adding car', error: err })
        );
    });
};


//------------------Update car----------------

const updateCar = (req, res) => {
    const { Register_num } = req.params;
    const updateData = req.body;

    Car.findOneAndUpdate({ Register_num: Register_num }, updateData, { new: true })
        .then(car => {
            if (!car) {
                return res.status(404).send({ message: 'Car not found' });
            }
            res.status(200).send({
                message: 'Car updated successfully',
                car
            });
        })
        .catch(err => res.status(500).send({ message: 'Error updating car', error: err }));
};



//--------------Delete Car---------------
const deleteCar = (req, res) => {
    const { Register_num } = req.params;

    Car.findOneAndDelete({ Register_num: Register_num })
        .then(car => {
            if (!car) {
                return res.status(404).send({ message: 'Car not found' });
            }
            res.status(200).send({ message: 'Car deleted successfully' });
        })
        .catch(err => res.status(500).send({ message: 'Error deleting car', error: err }));
};


//------------Get all cars-------------
const getAllCars =async (req, res) => {
    console.log("Execute the get all cars data");
    try{
            const cars = await Car.find();
            res.json(cars);
            console.log(cars);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting cars" });
      }
};





//------------Get One car------------

const getOneCar = (req, res) => {
    console.log("Attempting to retrieve car with ID:", req.params.Register_num);
   
    const { Register_num } = req.params;

    Car.findOne({ Register_num: Register_num })
        .then(car => {
            if (!car) {
                return res.status(404).send({ message: 'Car not found' });
            }
            res.status(200).send(car);
            res.json(car);
            console.log("\nGetting one Car Information:",car);
          
        })
        .catch(err => res.status(500).send({ message: 'Error retrieving car', error: err }));
};

module.exports = { AddCar,updateCar,deleteCar,getAllCars,getOneCar};




