const ModelsRouter = require('express').Router();
const { Accept_CarModel, Reject_CarModel, getAllModels, getacceptModels, getrejectModels, AddModel } = require('../controller/Latestmodel_controller');

const path = require('path');

// const multer = require('multer');





// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function(req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// });

// const upload = multer({ storage: storage });

ModelsRouter.post('/addmodel', AddModel);



ModelsRouter.get('/getallmodels', getAllModels);
ModelsRouter.get('/getacceptmodels', getacceptModels);
ModelsRouter.get('/getrejectmodels', getrejectModels);

ModelsRouter.put('/accept_model/:id', Accept_CarModel);
ModelsRouter.put('/reject_model/:id', Reject_CarModel);

module.exports = ModelsRouter;
