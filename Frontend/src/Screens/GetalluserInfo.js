import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header1 from '../components/Header_profile';


function GetAllUsers() {
  const [users, setUsers] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/user/getusers')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

 
  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      console.log("Deleting the user id:", userId);
      axios.post(`http://localhost:3000/user/deleteuser/${userId}`)
        .then(() => {
          setUsers(users.filter(user => user._id !== userId));
          console.log("Successfully deleted the user");
        })
        .catch(error => {
          console.error('Error deleting user', error);
          
        });
    }
  };


  const handleViewInfo = (userId) => {
    const user = users.find(u => u._id === userId);
    handleShowDetails(user);
  };

  const handleUpdate = (userId) => {
    navigate(`/update/${userId}`);
  };


  const handleAddUser = () => {
    navigate('/adduser');
  };

  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedUser(null);
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header1/>
      <div className="container mt-5 pt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>User Management</h3>
          <div>
            <button className="btn btn-success me-2" onClick={handleAddUser}>
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
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>
                    <button className="btn text-primary me-2" onClick={() => handleUpdate(user._id)}>
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button className="btn text-danger me-2" onClick={() => handleDeleteUser(user._id)}>
                      <i className="bi bi-trash-fill"></i>
                    </button>
                    <button className="btn text-dark" onClick={() => handleViewInfo(user._id)}>
                      <i className="bi bi-info-circle-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showDetails && selectedUser && (
          <div className="user-details-form" style={{
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            backgroundColor: 'grey', color:'white', padding: '20px', zIndex: 1001, width: '80%', maxWidth: '500px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
          }}>
            <h2>User Details</h2>
            <p><strong>First Name:</strong> {selectedUser.firstname}</p>
            <p><strong>Last Name:</strong> {selectedUser.lastname}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Username:</strong> {selectedUser.username}</p>
            <button className="btn btn-secondary" style={{backgroundColor:'white', color: '#1e526b', fontWeight:'bold'}}onClick={handleCloseDetails}>Close</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default GetAllUsers;
