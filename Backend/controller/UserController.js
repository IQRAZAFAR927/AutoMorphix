const User = require('../models/UserModel.js')
const jwt = require('jsonwebtoken')
// const Quiz = require('../models/ActivityModel.js')


//---------------------------Signup--------------------------
const AddUser = (req, res) => {
    console.log("Execute the Add User Function");
    const {firstname,lastname, email,password,username} = req.body;
    console.log(req.body);
   
    User.findOne({ username: username }).then((user) => {
      if (user) {
        res.status(400).send({ message: 'User already exists' });
        return;
      }
      const newUser = new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        username:username,
      });
        // Generate a token for the new user
      // const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY);
      newUser
        .save()
        .then((User) => {
          res.status(200).send({
            message: 'Successfully added User',
            user: user,
            // token: token, // Include the generated token in the response
          });
        })
        .catch((err) =>
          res.status(400).send({ message: 'Error adding users', error: err })
        );
    });
  };
  


//---------------------Upadate the User------------------------------------
  
const bcrypt = require('bcryptjs'); // Assuming you are using bcryptjs for password hashing

const updateUser = async (req, res) => {
  console.log("Execute the UpdateUser Function");
  const { userId } = req.params;  // Corrected to match the route parameter
  const { firstname, lastname, email, username, password } = req.body;

  try {
    // If the password is being updated, hash it
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const update = {
      firstname,
      lastname,
      email,
      username,
      ...(hashedPassword && { password: hashedPassword }), // Only add password to update if it's provided
    };

    const updatedUser = await User.findByIdAndUpdate(userId, update, { new: true }); // Option {new: true} to return the updated document

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile Updated", user: updatedUser });
    console.log("User Updated with this Information", updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating user", error: err });
    console.log(updateUser);
  }
};

//------------------Delete theh User----------------------------

  const deleteUser = async (req, res) => {
  
    const { userId } = req.params;
    console.log("Execute the Delete user Function",userId);
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully', User: deletedUser });
      console.log("User Delete with information:",deletedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting user' });
    }
  };
  

//-----------------------Getall user---------------------


  const getAllUser = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
      console.log(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error getting users" });
    }
  }


//-------------------------GetOne User--------------------

const getOneUsers = async (req, res) => {
  const { userId } = req.params;
  console.log("Attempting to retrieve user with ID:", userId);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
    console.log("\nGetting one user Information:", user);
  } catch (err) {
    console.error('Error retrieving user:', err);
    res.status(500).json({ message: 'Error retrieving user', error: err });
  }
};

 

module.exports = {AddUser,updateUser,deleteUser,getAllUser,getOneUsers}

