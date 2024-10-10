import React, { useState } from 'react';
import Header from './Header'; // Assuming Header is a separate component
import Footer from './Footer'; // Assuming Footer is a separate component
import './Contactus.css'; // Using the same stylesheet for consistency

function ContactUs() {
    const [isModalOpen, setModalOpen] = useState(false); // State to manage modal visibility

    const toggleModal = () => setModalOpen(!isModalOpen);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container flex-grow-1 d-flex align-items-center" style={{ paddingTop: '100px', paddingBottom: '100px', marginTop: '90px' }}>
                <div className="row justify-content-center w-100">
                    <div className="col-md-6">
                        {/* Clickable image to open modal */}
                        <img src="Contactus.jpg" alt="Contact Us" className="img-fluid" onClick={toggleModal} style={{ cursor: 'pointer' }} />
                    </div>
                    <div className="col-md-6 text-center">
                        <h1>Contact Us</h1>
                        <p>Have questions? We're ready to help!</p>
                        <section className="mb-5">
                            <h2>Get in Touch</h2>
                            <p>Feel free to drop us a message anytime:</p>
                            <ul style={{ listStyleType: 'none', padding: 0 }}> {/* Remove bullet points */}
                                <li>Email: <a href="mailto:support@automorphix.com">support@automorphix.com</a></li>
                                <li>Phone: +123 456 7890</li>
                            </ul>
                        </section>
                        <section>
                            <h2>Visit Us</h2>
                            <p>Our Office:</p>
                            <address>
                                FAST-NUCES Islamabad Campus
                            </address>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />

            {/* Modal for enlarged image */}
            {isModalOpen && (
                <div className="modal" style={modalStyle} onClick={toggleModal}>
                    <div className="modal-content" style={modalContentStyle} onClick={e => e.stopPropagation()}>
                        <span className="close-icon" style={closeIconStyle} onClick={toggleModal}>&times;</span>
                        <img src="Contactus.jpg" alt="Enlarged Contact Us" className="img-fluid" style={{ width: '100%' }} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ContactUs;

// CSS Styles for the modal
const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1050
};

const modalContentStyle = {
    position: 'relative',
    width: 'auto',
    maxWidth: '80%', // Adjust the size of the image
    padding: '0', // No padding, only the image is displayed
    textAlign: 'center'
};

const closeIconStyle = {
    position: 'absolute',
    top: '10px',
    right: '20px',
    fontSize: '30px',
    color: '#000',
    cursor: 'pointer'
};
