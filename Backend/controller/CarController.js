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
  console.log("Execute the Addcar function");
  const { Brand, Model, Year, Register_num } = req.body;

  console.log(Car);
  Car.findOne({ Register_num: Register_num }).then((car) => {
    if (car) {
      return res.status(400).send({ message: 'Car already exists with this Register number' });
    }
    const newCar = new Car({ Brand, Model, Year, Register_num });

    newCar.save()
      .then((car) => res.status(200).send({ message: 'Successfully added car', car }))
      .catch((err) => res.status(400).send({ message: 'Error adding car', error: err }));
  });
};


//------------------Update car----------------

const updateCar = (req, res) => {
  console.log("Execute the update car function");
    const { Register_num } = req.params;
    const updateData = req.body;

    Car.findOneAndUpdate({ Register_num: Register_num }, updateData, { new: true })
        .then(car => {
            if (!car) {
                return res.status(404).send({ message: 'Car not found' });
            }
            res.status(200).send({
                message: 'Car updated successfully',
                car: car,
            });
        })
        .catch(err => res.status(500).send({ message: 'Error updating car', error: err }));
};



//--------------Delete Car---------------
const deleteCar = async (req, res) => {
  const { Register_num } = req.params;
  console.log(`Attempting to delete car with registration number: ${Register_num}`);

  try {
      const car = await Car.findOneAndDelete({ Register_num: Register_num });
      if (!car) {
          console.log('Car not found');
          return res.status(404).send({ message: 'Car not found' });
      }
      console.log(`Car with registration number ${Register_num} deleted successfully`);
      res.status(200).send({ message: 'Car deleted successfully' });
  } catch (err) {
      console.error(`Error deleting car: ${err}`);
      res.status(500).send({ message: 'Error deleting car', error: err });
  }
};



//------------Get all cars-------------
const getAllCars =async (req, res) => {
    console.log("Execute the get all cars data");
    try{
            const cars = await Car.find().sort({ _id:-1 });
            res.json(cars);
            console.log(cars);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting cars" });
      }
};





//------------Get One car------------


const getOneCar = async (req, res) => {
  const { Register_num } = req.params;
  console.log("Execute the one get car information with register number:". Register_num);
 
  try {
      const car = await Car.findOne({ Register_num });
      if (!car) {
          return res.status(404).send({ message: 'Car not found' });
      }
      res.json(car);
  } catch (err) {
      console.error('Failed to retrieve car:', err);
      res.status(500).send({ message: 'Error retrieving car', error: err });
  }
};








module.exports = { AddCar,updateCar,deleteCar,getAllCars,getOneCar};




