const Modifier = require('../models/ModifierModel.js')

const jwt = require('jsonwebtoken')
// const Quiz = require('../models/ActivityModel.js')


//---------------------------Signup--------------------------
const AddModifier = (req, res) => {
    console.log("Execute the Add Modifier Function");
    const {firstname,lastname, email,password,username, role} = req.body;
    console.log(req.body);
   
    Modifier.findOne({ username: username }).then((modifier) => {
      if (modifier) {
        res.status(400).send({ message: 'User already exists' });
        return;
      }
      const newModifier = new Modifier({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        username:username,
        role:  'modifier' // Default role is 'modifier' if not provided
      

      });
        // Generate a token for the new user
      // const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY);
      newModifier
        .save()
        .then((modifier) => {
          res.status(200).send({
            message: 'Successfully Modifier',
            modifier: modifier,
            // token: token, // Include the generated token in the response
          });
        })
        .catch((err) =>
          res.status(400).send({ message: 'Error adding modifier', error: err })
        );
    });
  };
  


 

const loginModifier = async (req, res) => {
    const { username, password } = req.body;

    try {
        const modifier = await Modifier.findOne({ username: username });

        if (!modifier || modifier.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: modifier._id, role: modifier.role }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
                username: modifier.username,
                role: modifier.role // Return role in the response
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err });
    }
};



//---------------------Upadate the User------------------------------------
  
// const bcrypt = require('bcryptjs'); // Assuming you are using bcryptjs for password hashing


const updateModifier = async (req, res) => {
  console.log("Execute the Update Modifier Function");
  const { modifierId } = req.params;  // Corrected to match the route parameter
  const { firstname, lastname, email, username } = req.body;

  try {
    // If the password is being updated, hash it
    // const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const update = {
      firstname,
      lastname,
      email,
      username,
    //   ...(hashedPassword && { password: hashedPassword }), // Only add password to update if it's provided
    };

    const updatedModifier = await Modifier.findByIdAndUpdate(modifierId, update, { new: true }); // Option {new: true} to return the updated document

    if (!updatedModifier) {
      return res.status(404).json({ message: "Modifier not found" });
    }

    res.json({ message: "Profile Updated", modifier: updatedModifier });
    console.log("Modifier Updated with this Information", updatedModifier);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating modifier", error: err });
    console.log( updateModifier);
    res.json(updateModifier);
  }
};


// //------------------Delete theh User----------------------------

const deleteModifier = async (req, res) => {
  const { modifierId } = req.params;
  console.log("Execute the Delete modofier Function",modifierId);
  try {
      const deletedModifier = await Modifier.findByIdAndDelete(modifierId);
      if (!deletedModifier) {
          return res.status(404).json({ message: 'Modifier not found' }); // Return to stop execution
      }
      console.log(`Modifier with ID Number ${modifierId} deleted successfully`);
      res.status(200).json({ message: 'Modifier deleted successfully', Modifier: deletedModifier });
  } catch (err) {
      console.error(err);
      // Only send this response if no other response has been sent
      if (!res.headersSent) {
          res.status(500).json({ message: 'Error deleting modifier' });
      }
  }
};

  

// //-----------------------Getall user---------------------


const getAllModifier = async (req, res) => {
  console.log("Excecute all modifier data");
  try {
    const modifiers = await Modifier.find().sort({ _id:-1 });
    console.log("Fetched modifiers:", modifiers);
    if (!modifiers) {
      console.log("No modifiers found!");
      return res.status(404).send("No modifiers found");
    }
    res.json(modifiers);
  } catch (err) {
    console.error('Error fetching modifiers:', err);
    res.status(500).json({ message: "Error getting modifiers", error: err });
  }
};


// //-------------------------GetOne User--------------------

const getOneModifier = async (req, res) => {
  const { modifierId } = req.params;
  console.log("Attempting to retrieve modifier with ID:", modifierId);

  try {
    const modifier = await Modifier.findById(modifierId);
    if (!modifier) {
      return res.status(404).json({ message: 'Modifier not found' });
    }
    res.status(200).json(modifier);
    console.log("\nGetting one modifier Information:", modifier);
  } catch (err) {
    console.error('Error retrieving modifier:', err);
    res.status(500).json({ message: 'Error retrieving modifier', error: err });
  }
};

 

module.exports = {AddModifier, updateModifier, deleteModifier, getAllModifier, getOneModifier, loginModifier}

