import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Footer() {
  return (
    <footer className="text-white text-center py-4 bg-opacity-50" style={{ backgroundColor: '#ac632c', boxShadow: '0 0 5px rgba(172,99,44,255), 0 0 5px rgba(172,99,44,255) inset' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>Contact Information</h5>
            <p>Email: AutoMorphix@gmail.com</p>
            <p>Phone: +1234567890</p>
            <p>Address: FAST-NUCES Islamabad Campus</p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Follow Us</h5>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-facebook"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-instagram"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Subscribe to Newsletter</h5>
            <form>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Email" />
                <div className="input-group-append">
                  <button className="btn btn-outline-light" type="button">Subscribe</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
