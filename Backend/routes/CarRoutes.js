const CarRouter = require('express').Router();
//const jwt = require('jsonwebtoken')
//var path = require('path')
const {AddCar,updateCar,deleteCar,getAllCars,getOneCar} = require('../controller/CarController')
const multer = require('multer');





const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

CarRouter.post('/addcar', upload.single('ImagePath'), AddCar)
//CarRouter.post('/addcar',AddCar);
CarRouter.put('/updatecar/:Register_num',updateCar)
CarRouter.delete('/deletecar/:Register_num',deleteCar)
CarRouter.get('/getallcars',getAllCars)
CarRouter.get('/getonecar/:Register_num',getOneCar)


module.exports = CarRouter;