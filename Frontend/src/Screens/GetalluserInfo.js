import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is imported
import 'bootstrap-icons/font/bootstrap-icons.css';

function GetAllUsers() {
  const [users, setUsers] = useState([]);

  const [showDetails, setShowDetails] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/user/getusers') // Adjust the URL based on your server setup
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // const handleDelete = (userId) => {
  //   if (window.confirm('Are you sure you want to delete this user?')) 
  //     {
  //     axios.delete(`http://localhost:3000/user/deleteuser/${userId}`)
  //       .then(response => {
  //         if (response.data.success) {  // Assuming your API returns a success flag
  //           setUsers(users.filter(user => user.userId !== userId));
  //           setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
  //           alert('User deleted successfully');
  //         } else {
  //           alert(response.data.message || 'Failed to delete user.');
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error deleting user:', error);
  //         alert('Error deleting user.');
  //       });
  //   }
  // };

  const handleDeleteuser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      console.log("Deleting the user id:", userId);
      axios.delete(`http://localhost:3000/user/deleteuser/${userId}`)
        .then(() => {
          setUsers(users.filter(user => user.userId !== userId));
          console.log("Successfully deleted the user");
        })
        .catch(error => {
          console.error('Error deleting user', error);
          alert("Error deleting the user");
        });
    }
  }
  // const handleDelete = (Register_num) => {
  //   axios.delete(`http://localhost:3000/car/deletecar/${Register_num}`)
  //     .then(() => {
  //       setCars(cars.filter(car => car.Register_num !== Register_num));
  //     })
  //     .catch(error => {
  //       console.error('Error deleting car', error);
  //     });
  // };

  
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
    <div className="bg-image" style={{
      backgroundImage: 'url("Background.jpeg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh'
    }}>
      <header className="w-100 text-white text-center py-2 fixed-top" style={{ backgroundColor: '#ac632c', marginBottom: '100px' }}>
        <h1>AutoMorphix</h1>
      </header>
      <div className="container pt-5 mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3" style={{ color: 'white' }}>
          <h2>All Users</h2>
          <button className="btn btn-success" style={{ padding: '0.25rem 0.5rem', color: 'inherit', fontSize: '1rem' }}
            onClick={handleAddUser}>
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
        <div className="table-responsive table-dark">
          <table className="table table-hover">
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
                    <button className="btn btn-link text-info" style={{ padding: '0.25rem 0.5rem', color: 'inherit', fontSize: '1rem' }}
                      onClick={() => handleUpdate(user._id)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn btn-link text-danger" style={{ padding: '0.25rem 0.5rem', color: 'inherit', fontSize: '1rem', marginRight: '0.5rem' }}
                      onClick={() => handleDeleteuser(user._id)}>
                      <i className="bi bi-trash-fill"></i>
                    </button>
                    <button className="btn btn-link text-secondary" style={{ padding: '0.25rem 0.5rem', color: 'inherit', fontSize: '1rem' }}
                      onClick={() => handleViewInfo(user._id)}>
                      <i className="bi bi-eye-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    </div>
  );
}

export default GetAllUsers;
