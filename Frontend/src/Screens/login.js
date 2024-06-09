import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is imported
import { useNavigate} from 'react-router-dom';

function SigninPage() {
  let navigate= useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

 
  const handleChange = (e) => {
    const {name, value} = e.target;  // Correctly use destructuring to get the name and value
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]:value
      
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/admin/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data= await response.json();

      if (response.ok) {
       
       // const result = await response.json();
        console.log('Login success:',data);
        localStorage.setItem('token',data.token);
        alert('Login Successful!');
        navigate('/admin');
      } 
      else{
        throw new Error(data.message);
      }
     // }
    } catch (error) {
      console.error('Login Error: ', error);
      alert('Login failed: '+ error.message);
      navigate('/admin');
    }
  }

  // let navigate= useNavigate();

  const goToSignUppage=()=>{
    navigate('/Signup');
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
      <div className="container d-flex justify-content-center align-items-center h-100">
            <div className="card border-0" style={{ 
               maxWidth: '800px',
               minHeight: '50vh',
               backgroundColor: '#b69e8c',
               borderRadius: '15px',
               border: '2px solid #ac632c' // This line sets the border color to #ac632c
            }}>
        <div className="row no-gutters align-items-center">
                <div className="col-md-6 d-flex justify-content-center" >
                    {/* Replace 'login.png' with the path to your image */}
                    <img src="login.png" style={{
                    borderRadius: '10px',
                    margin: '5px',
                    marginTop: '60px',
                    height: '50%',
                    width: '50%'
                    }} alt="Login Visual" className="img-fluid" />
                </div>

          <div className="col-md-1 d-flex justify-content-center align-items-center">
                <div className="vertical-line" style={{
                backgroundColor: 'red',
                width: '200px', // Corrected to ensure the line is visually distinct but not too wide
                height: '100%', // Adjusts the line's height
                }}></div>
          </div>

          <div className="col-md-5 d-flex flex-column p-4">
            <div className="my-2" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <div className="small-line" style={{
                        height: '5px',
                        width: '40px',
                        backgroundColor: '#ac632c',
                        marginBottom: '20px', // Adjusted for spacing
                    }}></div>
                    <p style={{ margin: 0 ,fontWeight:'bold'}}>Login as Admin user</p> {/* Removed className for simplicity */}
             </div>
                    <form onSubmit={handleSubmit}
                    style={{ marginTop: '20px' }}> {/* Added marginTop for spacing */}
                            <div className="mb-3" style={{ maxWidth: '250px', margin: 'auto' } }>
                                <input type="text" name='username' className="form-control" placeholder="Username"value={formData.username} onChange={handleChange} />
                            </div>
                            <div className="mb-3" style={{ maxWidth: '250px', margin: 'auto' }}> {/* Further adjusted the maxWidth for narrower inputs */}
                                <input type="password" name='password' className="form-control" placeholder="Password" value={formData.password} onChange={handleChange} />
                            </div>
                            {/* <div className="text-center mb-3">
                                <a href="#" className="text-black">Forgot Password?</a>
                            </div> */}
                            
                              {/* Rest of your code */}
                            <div className="d-flex justify-content-center align-items-center flex-column">
                            <p className="mb-2">Don't have an account?</p>
                            <p className='mb-2' type="submit" onClick={goToSignUppage} style={{color:'blue',fontWeight:'bold'}}>Create Account</p>
                              {/* <Link to="/signup" className="btn" style={{ backgroundColor: '#ac632c', color: 'white' }}>
                               Create account
                              </Link>  */}
                                <button type="submit" className="btn" 
                                style={{ backgroundColor: '#ac632c', color: 'white' }}>Login</button>
                  </div>
                            

                    </form>
              </div>
            </div>
          </div>
        </div>
    </div>
    
  );
}

export default SigninPage;
