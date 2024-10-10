import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPencilAlt } from 'react-icons/fa'; // Import pencil icon from react-icons
import Header1 from '../components/Header_profile';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom'; // To navigate back to the home screen

function Myprofile_Admin() {
  const [adminData, setAdminData] = useState(null); // Admin data state
  const [adminId, setAdminId] = useState(null); // Admin ID state
  const [isEditable, setIsEditable] = useState({}); // Track editable state for each field
  const [showUpdateButton, setShowUpdateButton] = useState(false); // Toggle the update button
  const navigate = useNavigate();

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    const adminIdFromStorage = localStorage.getItem('adminId'); // Get the adminId from localStorage

    if (storedAdmin) {
      setAdminData(JSON.parse(storedAdmin));
    }
    if (adminIdFromStorage) {
      setAdminId(adminIdFromStorage); // Store adminId in state
    }
  }, []);

  const handleEditClick = (field) => {
    setIsEditable((prevState) => ({ ...prevState, [field]: true }));
    setShowUpdateButton(true); // Show the update button when editing starts
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdateClick = async () => {
    if (!adminId) {
      alert("No admin ID found.");
      return;
    }
  
    try {
      // Make the API request to update the admin data
      const response = await fetch(`http://localhost:3000/admin/update/${adminId}`, {
        method: 'POST', // Assuming you use POST to update the admin
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData), // Send the updated admin data
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Server response data:', data); // Debug: Log the response data from the server
        
        // Check if the updated admin data exists in the response
        if (data.admin) {
          console.log('Updating localStorage with:', data.admin);
          // Update localStorage with the new admin data
          localStorage.setItem('admin', JSON.stringify(data.admin));
          
          // Update the local state with the new data
          setAdminData(data.admin);
          
          alert('Profile updated successfully!');
          setShowUpdateButton(false); // Hide the update button after successful update
          setIsEditable({}); // Make all fields non-editable after update
        } else {
          alert('Update failed: No updated admin data returned from server.');
        }
      } else {
        const errorData = await response.json();
        alert('Failed to update the profile: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error updating admin:', error);
      alert('An error occurred while updating the profile.');
    }
  };
  

  const handleDoneClick = () => {
    navigate('/admin'); // Navigate back to the home screen
  };

  if (!adminData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header1 />
      <div className="d-flex flex-column min-vh-100"> {/* Flex column ensures full height */}
        <div className="container my-5 flex-grow-1" style={{ paddingTop: '80px'}}> {/* Increased margin for spacing */}
          <h1 className="text-center mb-2" >My Profile</h1>
          <form className="row g-3">
            <div className="col-md-4 position-relative" style={{marginLeft:'200px', paddingTop:'20px'}}>
              <label htmlFor="firstname" className="form-label">First Name</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  name="firstname"
                  value={adminData.firstname} // Corrected from adminId to firstname
                  onChange={handleInputChange}
                  style={{ width: '100px', margin: '0 auto' }} // Center and reduce width
                  readOnly={!isEditable.firstname}
                />
                <span
                  className="pencil-icon"
                  style={{ cursor: 'pointer', marginLeft: '10px' , color:'#1e526b'}} // Pencil icon without border
                  onClick={() => handleEditClick('firstname')}
                >
                  <FaPencilAlt />
                </span>
              </div>
            </div>

            <div className="col-md-4 position-relative" style={{marginLeft:'50px', paddingTop:'20px'}}>
              <label htmlFor="lastname" className="form-label">Last Name</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  name="lastname"
                  value={adminData.lastname}
                  onChange={handleInputChange}
                  style={{ width: '100px', margin: '0 auto' }} // Center and reduce width
                  readOnly={!isEditable.lastname}
                />
                <span
                  className="pencil-icon"
                  style={{ cursor: 'pointer', marginLeft: '10px', color:'#1e526b' }} // Pencil icon without border
                  onClick={() => handleEditClick('lastname')}
                >
                  <FaPencilAlt />
                </span>
              </div>
            </div>

            <div className="col-md-4 position-relative" style={{marginLeft:'200px', paddingTop:'20px'}}>
              <label htmlFor="username" className="form-label">Username</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={adminData.username}
                  onChange={handleInputChange}
                  style={{ width: '100px', margin: '0 auto' }} // Center and reduce width
                  readOnly={!isEditable.username}
                />
                <span
                  className="pencil-icon"
                  style={{ cursor: 'pointer', marginLeft: '10px' , color:'#1e526b'}} // Pencil icon without border
                  onClick={() => handleEditClick('username')}
                >
                  <FaPencilAlt />
                </span>
              </div>
            </div>

            <div className="col-md-4 position-relative" style={{marginLeft:'50px', paddingTop:'20px'}}>
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={adminData.email}
                  onChange={handleInputChange}
                  style={{ width: '100px', margin: '0 auto' }} // Center and reduce width
                  readOnly={!isEditable.email}
                />
                <span
                  className="pencil-icon"
                  style={{ cursor: 'pointer', marginLeft: '10px' , color:'#1e526b'}} // Pencil icon without border
                  onClick={() => handleEditClick('email')}
                >
                  <FaPencilAlt />
                </span>
              </div>
            </div>

            {/* Done Button is always shown, Update Button appears on editing */}
            <div className="col-12 d-flex justify-content-center align-items-center mt-4" style={{paddingTop:'40px'}}>
              <button
                type="button"
                className="btn btn-primary me-3" // Added margin-right to separate from Update button
                onClick={handleDoneClick}
              >
                Done
              </button>
              {showUpdateButton && (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleUpdateClick}
                >
                  Update
                </button>
              )}
            </div>
          </form>
        </div>
        <Footer /> {/* Ensure footer stays at the bottom */}
      </div>
    </>
  );
}

export default Myprofile_Admin;
