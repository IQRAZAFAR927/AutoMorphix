import React, { useState , useEffect,  useRef} from 'react';

import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModifierHeader from '../components/EditHeader';
import Footer from '../components/Footer';


function HomePage_modifier() {
  const navigate = useNavigate();
  const[showModal, setShowModal] = useState(false);
  const[selecedImage, setSelectedImage] = useState('');

  const [isImageVisible, setImageVisible] = useState(false);
  const [isTextVisible, setTextVisible] = useState(false);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.1
    };
  
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.target === imageRef.current) {
          setImageVisible(entry.isIntersecting);
          if (entry.isIntersecting) {
            entry.target.style.transform = 'translateY(0)'; // Apply animation
          } else {
            entry.target.style.transform = 'translateY(100%)'; // Reset animation
          }
        }
        if (entry.target === textRef.current) {
          setTextVisible(entry.isIntersecting);
          if (entry.isIntersecting) {
            entry.target.style.transform = 'translateY(0)'; // Apply animation
          } else {
            entry.target.style.transform = 'translateY(100%)'; // Reset animation
          }
        }
      });
    };
  
    const observer = new IntersectionObserver(observerCallback, observerOptions);
  
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    if (textRef.current) {
      observer.observe(textRef.current);
    }
  
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleOpen = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const goTologinpage = () => {
    navigate('/login');
  };

  const goToSignUppage = () => {
    console.log("Navigating to signup page"); // Debugging
    navigate('/signup');
  };


  // Defining inline styles for buttons, including transitions
   // Example car models
   const carModels = [
    { name: 'Audi', image: 'Audi.jpeg' },
    { name: 'Civic', image: 'civic.jpeg' },
    { name: 'Civic_old', image: 'civic_old.jpeg' },
    {name: 'Toyota', image:'Toyata.jpeg'},
    {name:'Toyota_old', image:"Toyata_old.jpeg"}
  ];
   // Example car models
   const carParts = [
    { name: 'Spolier', image: 'spolier1.jpg' },
    { name: 'Side Mirrors', image: 'side_mirror1.jpg' },
    { name: 'Gear Knob', image: 'gear_knob1.jpeg' },
    {name: 'Stearing Wheel', image:'steering.jpg'},
    {name:'seats', image:"seats.png"}
  ];
  const buttonBaseStyle = {
    padding: '10px 20px',  // Custom padding
    borderRadius: '20px',  // Rounded edges
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',  // Smooth transition for transform and shadow
    backgroundColor:'#1e526b',
    color:'white'
  };
  const buttonBaseStylelogin = {
    padding: '10px 20px',  // Custom padding
    borderRadius: '20px',  // Rounded edges
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',  // Smooth transition for transform and shadow
    
  };

 
 
  return (
    <div className="d-flex flex-column" style={{
      background: 'linear-gradient(to right, #d9d9d9, #595959)', // Example gradient from deep blue to green
      height: '90vh',
      marginTop: '70px',
      marginBottom: '5px'
    }}>
    <ModifierHeader/>
   
  
      <div className="container mt-5" style={{ height: '1000vh' }}>
        <div className="row align-items-center">
          <div className="col-md-6">
          <h1  style={{ color: '#1e526b' }}>AutoMorphix</h1>
            <h2 >Auto-customize your Cars in Virtual Reality</h2>
            <p className="text-muted">Step into the driver's seat of innovation at AutoMorphix,
               where Unity and VR blend to transform car customization. 
               Explore our immersive VR environment to modify your dream car with 
               unmatched precision and creativity, elevating your entire automotive experience.</p>
            <div className="d-flex">
              <button className="btn  me-3 shadow" 
                      style={buttonBaseStyle}
                      onMouseEnter={e => { e.target.style.transform = 'scale(1.1)'; e.target.style.boxShadow = '0 0 15px #000'; }}
                      onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = 'none'; }}
                      onClick={goToSignUppage}>
                Signup
              </button>
              <button className="btn btn-secondary shadow"
                      style={buttonBaseStylelogin}
                      onMouseEnter={e => { e.target.style.transform = 'scale(1.1)'; e.target.style.boxShadow = '0 0 15px #000'; }}
                      onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = 'none'; }}
                      onClick={goTologinpage}>
                Login
              </button>
            </div>
          </div>
          <div className="col-md-6">
           <img src="corolla.png" alt="Dashboard Example" className="img-fluid" style={{ maxWidth: '100%', height: '500px', width: '2500px' }} />
      </div>

           {/* Car models section */}
            {/* In the render or return method of your component: */}
      </div>    
              {/* Models Section */}
      <div className="container-fluid px-0 " ID='Cars' style={{  marginTop: '200px', height: '100vh',marginBottom:'30px' }}>
          <h2 className="text-center py-0">Our Latest Models</h2>
          <p className="text-center m-0">
            Step into the driver's seat of innovation at AutoMorphix, where Unity and VR blend to transform car customization.
            Explore our immersive VR environment to modify your dream car with unmatched precision and creativity,
            elevating your entire automotive experience.
          </p>
        <div className="row mx-0" style={{ marginTop: '20px', height: '100vh' }}>
          {carModels.map((model, index) => (
            <div className="col-md-4 mb-4 px-2" style={{ marginTop:'10px'}} key={index}>
              <div className="card h-250 text-center" style={{backgroundColor:'#808080', color:'White'}} 
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.5)'} 
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                onClick={()=>handleOpen(`${process.env.PUBLIC_URL}/${model.image}`)}>

                <img src={`${process.env.PUBLIC_URL}/${model.image}`} alt={model.name} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body" style={{backgroundColor:'#1e526b', color:'white', fontWeight:'14px'}}>
                <p className="card-text card-heading" style={{ fontWeight:'bold', margin: '0' }}>{model.name}</p>
                </div>
              </div>
            </div>
          ))}
          <Modal show={showModal} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Image Preview</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <img src={selecedImage} alt="Car" style={{ width: '100%',backgroundColor:'#D3D3D3' }} />
              </Modal.Body>
           </Modal>
        </div>
      </div>
    </div>

    <div style={{ background: 'linear-gradient(to right, #4ca3cd, #112e3c)', color: 'white', height: '100vh', marginTop: '100px', padding: '50px' }}>
        <div className="row w-100 mx-0">
          <div className="col-md-6">
            <img ref={imageRef} src="VR.png" alt="Virtual Reality" className="img-fluid" style={{ transition: 'transform 0.5s ease-out', transform: isImageVisible ? 'translateY(0)' : 'translateY(100%)' }} />
          </div>
          <div ref={textRef} className="col-md-6 d-flex flex-column justify-content-center align-items-start px-5" style={{ transition: 'transform 0.1s ease-out', transform: isTextVisible ? 'translateY(0)' : 'translateY(100%)' }}>
            <h2>What is VR Customization?</h2>
            <p>We leverage Virtual Reality to bring immersive car customization experiences. With our VR technology, you can virtually modify your car in 3D space, allowing you to visualize modifications in real-time.</p>
            <ul>
              <li>Experience true customization with VR.</li>
              <li>See changes as you make them.</li>
              <li>Choose from a wide range of car parts and colors.</li>
            </ul>
          </div>
        </div>
      </div>
      
  <div className="container-fluid px-0" ID='Parts' style={{ backgroundColor: 'white', paddingTop: '50px' }}>
  <h2 className="text-center">Featured Car Parts</h2>
  <p className="text-center">Discover our range of high-quality car parts designed for peak performance and durability.</p>
  <div className="row mx-0 justify-content-center">
    {/* Mock data for car parts */}
    {carParts.map((part, index) => (
      <div className="col-md-4 mb-4 px-2" key={index}>
        <div className="card h-250 text-center"  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.5)'}
             onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
          <img src={`${process.env.PUBLIC_URL}/${part.image}`} alt={part.name} className="card-img-top" 
               style={{ height: '400px', width: '100%', objectFit: 'cover' }} />
          <div className="card-body" style={{backgroundColor:'#1e526b', color:'white', fontWeight:'14px'}}>
            <h5 className="card-title">{part.name}</h5>
            <p className="card-text">{part.description}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
  <Footer/>
</div>


</div>


  );
}

export default HomePage_modifier;
