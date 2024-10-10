import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header1 from '../components/Header_profile';


function GetAllModifier() {
  const [modifiers, setModifiers] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedModifier, setSelectedModifier] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetch the data");
    axios.get('http://localhost:3000/modifier/getallmodifiers')
      .then(response => setModifiers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

 
  const handleDeleteUser = (modifierId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
        axios.delete(`http://localhost:3000/modifier/deletemodifier/${modifierId}`)
            .then(() => {
                // Correctly filter out the deleted modifier. Ensure '_id' is the correct field name as per your database schema
                setModifiers(currentModifiers => 
                    currentModifiers.filter(modifier => modifier._id !== modifierId)
                );
                console.log("Successfully deleted the modifier with ID:", modifierId);
            })
            .catch(error => {
                console.error('Error deleting modifier:', error);
            });
    }
};



  const handleViewInfo = (modifierId) => {
    const modifier = modifiers.find(modifier => modifier._id === modifierId);
    handleShowDetails(modifier);
  };

  const handleUpdate = (modifierId) => {
    navigate(`/updatemodifier/${modifierId}`);
  };


  const handleAddModifier = () => {
    navigate('/addmodifier');
  };

  const handleShowDetails = (modifier) => {
    setSelectedModifier(modifier);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedModifier(null);
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header1/>
      <div className="container mt-5 pt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Modifier Management</h3>
          <div>
            <button className="btn btn-success me-2" onClick={handleAddModifier}>
              <i className="bi bi-plus-lg"></i>
            </button>
           
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {modifiers.map(modifier => (
                <tr key={modifier._id}>
                  <td>{modifier.firstname}</td>
                  <td>{modifier.lastname}</td>
                  <td>{modifier.email}</td>
                  <td>{modifier.username}</td>
                  <td>
                    <button className="btn text-primary me-2" onClick={() => handleUpdate(modifier._id)}>
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button className="btn text-danger me-2" onClick={() => handleDeleteUser(modifier._id)}>
                      <i className="bi bi-trash-fill"></i>
                    </button>
                    <button className="btn text-dark" onClick={() => handleViewInfo(modifier._id)}>
                      <i className="bi bi-info-circle-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showDetails && selectedModifier && (
          <div className="user-details-form" style={{
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            backgroundColor: 'grey', color:'white', padding: '20px', zIndex: 1001, width: '80%', maxWidth: '500px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
          }}>
            <h2>Modifier Details</h2>
            <p><strong>First Name:</strong> {selectedModifier.firstname}</p>
            <p><strong>Last Name:</strong> {selectedModifier.lastname}</p>
            <p><strong>Email:</strong> {selectedModifier.email}</p>
            <p><strong>Username:</strong> {selectedModifier.username}</p>
            <button className="btn btn-secondary" style={{backgroundColor:'white', color: '#1e526b', fontWeight:'bold'}}onClick={handleCloseDetails}>Close</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default GetAllModifier;
