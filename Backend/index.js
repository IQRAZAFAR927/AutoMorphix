const mongoose = require('mongoose');	
const express = require('express');
const cors = require('cors');
const adminRouter = require('./routes/AdminRoutes')
const userRouter = require('./routes/UserRoutes')
const CarRouter = require ('./routes/CarRoutes')
const ModifierRouter = require('./routes/ModifierRoutes')
const adminRouter1 = require('./routes/ModifierRoutes')
const  modelrouter = require('./routes/Latestmodel_routes')


// const fs = require('fs');
// const dir = './uploads';

// if (!fs.existsSync(dir)){
//     fs.mkdirSync(dir, { recursive: true });
// }
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//       cb(null, 'uploads/')  // Make sure this path is correct
//   },
//   filename: function(req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname)
//   }
// });
// console.log(__dirname); // Logs the directory name of the current module


require('dotenv').config();

const app = express();

//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());


app.use(cors());

// app.use('/admin1',adminRouter1);
app.use('/admin',adminRouter);
app.use('/user',userRouter);
app.use('/car', CarRouter)
app.use('/modifier', ModifierRouter);
app.use('/model', modelrouter);
console.log('Car routes are set up.');


// app.get('/', (req, res) => 
// {
//     // res.send('This is WEB Engineering Exam!')   
// })

app.listen(process.env.PORT||3000, ()=>{
    console.log(`App listening at port ${process.env.PORT}`)
})
 mongoose.set('strictQuery', false);
 mongoose.connect(process.env.MONGO_URL)
 .then(() => {
   console.log("Connected to MongoDB Atlas");
 })
 .catch((error) => {
   console.log("Error connecting to MongoDB Atlas: ");
 });















