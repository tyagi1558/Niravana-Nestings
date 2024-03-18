import React from 'react';
import './Footer.css'
import { AiFillFacebook } from 'react-icons/ai';
import { AiFillTwitterSquare } from 'react-icons/ai';
import { AiFillInstagram } from 'react-icons/ai';
import { AiFillLinkedin } from 'react-icons/ai';
const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-5">
     <div class="footer">
  <div class="footer-links">
    <div class="footer-section">
            <h5>About Us</h5>
            <p>Our vision is to make all people
the best place to live for them..</p>
          </div>
          <div class="footer-section">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/properties">Properties</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h5>Contact Us</h5>
            <address>
              Sector 39<br />
              Jharsa, Gurgaon, Haryana<br />
               
            </address>
          </div>
        </div>
        <hr />
    
      </div>
    </footer>
  );
};

export default Footer;
