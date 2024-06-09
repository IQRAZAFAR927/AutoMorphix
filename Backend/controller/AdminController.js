const Admin = require('../models/AdminModel.js')
const jwt = require('jsonwebtoken')
// const Quiz = require('../models/ActivityModel.js')


//---------------------------Signup--------------------------
const signup = (req, res) => {
    console.log("Execute the Signup");
    const {firstname,lastname, email,password,username} = req.body;
    console.log(req.body);
   
    Admin.findOne({ username: username }).then((admin) => {
      if (admin) {
        res.status(400).send({ message: 'Admin already exists with this username' });
        return;
      }
      const newAdmin = new Admin({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        username:username,
      });
        // Generate a token for the new user
      // const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY);
      newAdmin
        .save()
        .then((admin) => {
          res.status(200).send({
            message: 'Successfully added admin',
            admin: admin,
            // token: token, // Include the generated token in the response
          });
        })
        .catch((err) =>
          res.status(400).send({ message: 'Error adding admin', error: err })
        );
    });
  };
  
//----------------------Login------------------------------------
const login = (req,res)=>{
    console.log("Execute the Login")
    const {username, password} = req.body;
    console.log(req.body);
    Admin.findOne({username:username}).then((admin)=>{
        if(admin){
            if(admin.password==password){
                //const token = jwt.sign({id:admin._id,role:admin.role},process.env.SECRET_KEY,{expiresIn:'24h'})
                res.status(200).send({message:'Successfully logged in',admin:admin,token:token})
            }else{
                res.status(400).send({message:'Invalid credentials'})
            }
        }else{
            res.status(400).send({message:'Invalid credentials'})
        }
    }).catch((err)=>{res.status(400).send({message:'Error logging in',error:err})})
}

//---------------------Upadate the Admin------------------------------------
  
  const updateAdmin = async (req, res) => {
    console.log("Execuate the UpdateAdmin Function")
    const { id } = req.params;
    console.log(id);
    const newAdmin = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    };
    // console.log(req.body);
    try {
      console.log("Execute the update function");
      const updatedadmin = await Admin.findByIdAndUpdate(id, newAdmin);
      res.json({ message: "Profile Updated", admin: updatedadmin });
      console.log("Admin Updated with this Information",updatedadmin);
    } catch (err) {
     // console.error(err);
      res.status(500).json({ message: "Error updating admin" });
    }
  };
  
//------------------DeleteAdmin----------------------------

  const deleteAdmin = async (req, res) => {
    console.log("Execute the Deletadmin Function");
    const { id } = req.params;
    try {
      const deletedAdmin = await User.findByIdAndDelete(id);
      if (!deletedAdmin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
      res.json({ message: 'Admin deleted successfully', admin: deletedAdmin });
      console.log("Admin Delete with information:",deletedAdmin);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting admin' });
    }
  };
  

//-----------------------GetallAdmin---------------------


  const getAllAdmin = async (req, res) => {
    try {
      const admins = await Admin.find();
      res.json(admins);
      console.log(admins);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error getting admins" });
    }
  }


//-------------------------GetOneAdmin--------------------


const getOneAdmin = async (req, res) => {
    const { id } = req.params;  
    try {
      const admin = await Admin.findById(id);
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
      res.json(admin);
      console.log("\nGetting one Admin Information:",admin);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting admin' });
    }
  };
 
 

module.exports = {login,signup,updateAdmin,deleteAdmin,getAllAdmin,getOneAdmin}

