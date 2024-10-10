import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import './Style.css'; // Ensure this is the correct path to your CSS file

function AboutUs() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-animation'); // Existing animation class for other elements
                    if (entry.target.dataset.animation === 'vr') {
                        entry.target.classList.add('animate-vr-box'); // Specific animation for VR box
                    }
                } else {
                    entry.target.classList.remove('show-animation');
                    entry.target.classList.remove('animate-vr-box');
                }
            });
        }, { threshold: 0.5 }); // Adjust threshold based on when you want the animation to trigger

        const elements = document.querySelectorAll('.animate-text-box'); // Select all elements initially set to animate
        elements.forEach(el => observer.observe(el));

        // Specifically select VR box for different animation
        const vrBox = document.querySelector('.vr-animation-box');
        if (vrBox) observer.observe(vrBox);

        return () => {
            elements.forEach(el => observer.unobserve(el));
            if (vrBox) observer.unobserve(vrBox);
        };
    }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container flex-grow-1" style={{ paddingTop: '100px' }}> {/* Add padding to push content below the fixed header */}
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="display-3 fw-bold mb-4">Customize your cars, Come to AUTOMORPHIX</h2>
            <p className="lead mb-5">We envision a world where anyone, from car enthusiasts to industry professionals,
                 can explore, modify, and perfect their vehicle designs virtually before taking them to the streets. 
                 AutoMorphix is committed to pushing the boundaries of what's possible in car customization by 
                 continuously innovating and providing our users with the most advanced and intuitive tools available.</p>
          </div>
        </div>
        
        {/* VR Customization Section */}
        <div className="row align-items-center mb-5 p-4">
                    <div className="col-md-6 d-flex flex-column justify-content-center align-items-start px-5 vr-text-box"
                         style={{ backgroundColor: '#1e526b', color: 'white', height: '300px', borderRadius: '10px'}}>
                        <h2>What is VR Customization?</h2>
                        <p>We leverage Virtual Reality to bring immersive car customization experiences. With our VR technology, you can virtually modify your car in 3D space, allowing you to visualize modifications in real-time.</p>
                        <ul>
                            <li>Experience true customization with VR.</li>
                            <li>See changes as you make them.</li>
                            <li>Choose from a wide range of car parts and colors.</li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <img src="/VR.png" alt="Workspace" className="img-fluid"/>
                    </div>
                </div>

        {/* Why Choose Us Section */}
        <div className="row align-items-center mb-4 p-4" style={{ marginBottom: '100px' }}>
          <div className="col-md-6 d-flex justify-content-center"> 
            <img src="Choose1.jpg" alt="Workspace" className="img-fluid fade-in" style={{ maxWidth: '500px', width: '100%' }}/>
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-start px-5 animate-text-box" 
               style={{ backgroundColor: '#1e526b', color:'white', height:'300px', borderRadius:'10px'}}>
            <h2>Why Choose Us?</h2>
            <p>At AutoMorphix, we believe in the future of car customization. Our platform offers:</p>
            <ul>
              <li>Watch your modifications come to life instantly in a highly detailed 3D environment.</li>
              <li>Experiment with colors, accessories, and features to design the perfect car that suits your style.</li>
              <li>Experience a lifelike 3D environment that allows you to view every detail and angle of your customizations.</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
