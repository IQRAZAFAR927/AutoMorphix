import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function GetAllUsers() {
  const [users, setUsers] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/user/getusers')
      .then(response => response.json())
      .then(data => setUsers(data))
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
          alert("Error deleting the user");
        });
    }
  };

  const handleUpdate = (userId) => {
    navigate(`/update/${userId}`);
  };

  const handleViewInfo = (userId) => {
    axios.get(`http://localhost:3000/user/getoneUser/${userId}`)
      .then(response => {
        setCurrentUser(response.data);
        setShowDetails(true);
      })
      .catch(error => console.error('Error fetching user details:', error));
  };

  const handleAddUser = () => {
    navigate('/adduser');
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Header style={{ position: 'sticky', top: '0', zIndex: 9999 }} />
      <div className="container d-flex flex-column justify-content-center align-items-center h-100 bg-opacity-25" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <div
          className="card border-0"
          style={{
            marginTop: '50px',
            marginLeft: '200px',
            minWidth: '800px',
            minHeight: '80vh',
            marginBottom: '200px',
            backgroundColor: 'rgba(194, 167, 148, 0.95)',
            borderRadius: '15px',
            padding: '20px',
            boxShadow: '0 0 5px rgba(172,99,44,255), 0 0 5px rgba(172,99,44,255) inset',
            maxHeight: '60vh', // Set maximum height for the container
            overflowY: 'auto' // Enable vertical scrolling
          }}
        >
          <h3 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}>All Users</h3>
          <button className="btn btn-success mb-3" onClick={handleAddUser} style={{ position: 'absolute', right: 20, top: 30, padding: '0.25rem 0.5rem', color: 'inherit', fontSize: '1rem' }}>
            <i className="bi bi-plus-lg">Add</i>
          </button>
          
          <div className="d-flex flex-wrap justify-content-start">
            {users.map(user => (
              <div key={user._id} className="card m-2 d-flex flex-column" style={{ width: '20rem', backgroundColor: 'rgba(172,99,44,0.8)' }}>
                <div className="card-body">
                  <h5 className="card-title">{user.firstname} {user.lastname}</h5>
                  <p className="card-text">Email: {user.email}</p>
                  <p className="card-text">Username: {user.username}</p>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-link text-info" style={{ padding: '0.25rem 0.5rem', color: 'inherit', fontSize: '1rem' }}
                      onClick={() => handleUpdate(user._id)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn btn-link text-danger" style={{ padding: '0.25rem 0.5rem', color: 'inherit', fontSize: '1rem', marginRight: '0.5rem' }}
                      onClick={() => handleDeleteUser(user._id)}>
                      <i className="bi bi-trash-fill"></i>
                    </button>
                    <button className="btn btn-link text-secondary" style={{ padding: '0.25rem 0.5rem', color: 'inherit', fontSize: '1rem' }}
                      onClick={() => handleViewInfo(user._id)}>
                      <i className="bi bi-eye-fill"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showDetails && currentUser && (
          <div className="user-details-form" style={{
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            backgroundColor: '#b79d8c', padding: '20px', zIndex: 1001, width: '80%', maxWidth: '500px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
          }}>
            <h2>User Details</h2>
            <p style={{ width: '100%', textAlign: 'center' }}><strong>First Name:</strong> {currentUser.firstname}</p>
            <p style={{ width: '100%', textAlign: 'center' }}><strong>Last Name:</strong> {currentUser.lastname}</p>
            <p style={{ width: '100%', textAlign: 'center' }}><strong>Email:</strong> {currentUser.email}</p>
            <p style={{ width: '100%', textAlign: 'center' }}><strong>Username:</strong> {currentUser.username}</p>
            <button className="btn btn-success" style={{ marginTop: '20px' }} onClick={() => setShowDetails(false)}>Done</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default GetAllUsers;
