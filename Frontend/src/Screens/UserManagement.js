import React from 'react';
// import { BrowserRouter as   useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import { useNavigate } from 'react-router-dom';

function UserManagement() {
  let navigate= useNavigate();

  const goToAdduser=()=>{
    navigate('/adduser');
  }
  const goToUpdateuser=()=>{
    navigate('/updateuser/:userId')
  
  }
  const goToRemoveuser=()=>{
    navigate('/deleteuser/:userId')
  }
  const gotoGetalluser=()=>{
    navigate('/getusers')
  }
  
  

  return (
    <div className="bg-image" style={{
      backgroundImage: 'url("Background.jpeg")', // Replace with your actual background image
       backgroundSize: 'cover',
       backgroundPosition: 'center',
       height: '100vh'
     }}>
      <header className="w-100 text-white text-center py-3 fixed-top" style={{ backgroundColor: '#ac632c' }}>
        <h1>AutoMorphix</h1>
      </header>

      <div className="container d-flex flex-column justify-content-center align-items-center h-100">
        <div className="card border-0 primary-border" style={{ 
            marginTop:'50px',
             minWidth: '800px',
             minHeight: '60vh',
            backgroundColor: 'rgba(194, 167, 148, 0.95)', // Container background color
            borderRadius: '15px',
            padding: '20px',
            boxShadow: '0 0 5px rgba(172,99,44,255), 0 0 5px rgba(172,99,44,255) inset' // Reflective effect
        }}>
        <h3 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}>User Management</h3> {/* Add User heading */}
    
     
        <div className="d-flex justify-content-between" style={{ marginTop: '8rem' ,marginLeft:'5rem'}}>
            {/* Buttons displayed in one line with proper spacing using Bootstrap grid */}
            <div className="col">
            
            <button type="button" onClick={goToAdduser} className="btn  w-60" style={{ backgroundColor: '#ac632c', color: 'white' }}>
                Add User
              </button>
         
              
            </div>
            <div className="col">
              <button type="button" className="btn  w-60" onClick={goToRemoveuser}
               style={{ backgroundColor: '#ac632c', color: 'white' }}>
                Remove User
              </button>
            </div>
            <div className="col">
              <button type="button" onClick={goToUpdateuser} className="btn  w-60" style={{ backgroundColor: '#ac632c', color: 'white' }}>
                Update User
              </button>
            </div>
            <div className="col">
              <button type="button" className="btn  w-60" onClick={gotoGetalluser}
               style={{ backgroundColor: '#ac632c', color: 'white' }}>
                Get all User
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
  
  );
}

export default UserManagement;
