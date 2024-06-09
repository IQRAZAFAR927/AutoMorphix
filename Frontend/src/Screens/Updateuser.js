import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateUser() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: ''
    });
    const navigate = useNavigate();
    const { userId } = useParams(); // Assuming you're passing userId as a URL param

    useEffect(() => {
        // Fetch the user data from the server
        const fetchUserData = async () => {
            const response = await fetch(`http://localhost:3000/user/getoneUser/${userId}`,{
              method:'GET',
              headers:{
                'Content-Type': 'application/json'
              }
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setFormData({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    username: data.username,
                    password: ''
                });
            } else {
                alert('Failed to fetch user data.');
            }
        };

        fetchUserData();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/user/updateuser/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (response.ok) {
                alert('User updated successfully');
                navigate('/getusers'); // Redirect to the user list
            } else {
                alert(result.message || 'Failed to update user. Please try again.');
            }
        } catch (error) {
            alert('Error during user update.');
            console.error('Error during user update:', error);
        }
    };

    return (
        <div className="bg-image" style={{
            backgroundImage: 'url("Background.jpeg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh'
        }}>
            <header className="w-100 text-white text-center py-2 fixed-top" style={{ backgroundColor: '#ac632c' }}>
                <h1>AutoMorphix</h1>
            </header>

            <div className="container d-flex flex-column justify-content-center align-items-center h-100">
                <div className="card border-0" style={{
                    maxWidth: '800px',
                    backgroundColor: '#b49d8b',
                    borderRadius: '15px',
                    padding: '20px',
                    marginTop: '50px'
                }}>
                    <h6 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}>Update User</h6>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="firstName" className="form-label font-weight-bold">First Name:</label>
                                <input type="text" id="firstName" name="firstname" className="form-control" placeholder="Enter first name" value={formData.firstname} onChange={handleChange} />
                            </div>
                            <div className="col">
                                <label htmlFor="lastName" className="form-label font-weight-bold">Last Name:</label>
                                <input type="text" id="lastName" name="lastname" className="form-control" placeholder="Enter last name" value={formData.lastname} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label font-weight-bold">Email:</label>
                            <input type="email" id="email" name="email" className="form-control" placeholder="Enter email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label font-weight-bold">Username:</label>
                            <input type="text" id="username" name="username" className="form-control" placeholder="Choose a username" value={formData.username} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label font-weight-bold">Password:</label>
                            <input type="password" id="password" name="password" className="form-control" placeholder="Create a password" value={formData.password} onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn" style={{ backgroundColor: '#ac632c', color: 'white', fontWeight: 'bold' }}>Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateUser;
