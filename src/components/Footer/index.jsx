import React from "react";
import {
  DiscordFilled,
  FacebookFilled,
  InstagramFilled,
} from "@ant-design/icons";
import "./footer.css";
function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h2>HairHarmony Salon</h2>
            <p>
              Your one-stop destination for all your hairstyling needs. We offer
              personalized services by professional stylists.
            </p>
            <div className="socials">
              <a href="#">
                <FacebookFilled />
              </a>
              <a href="#">
                <InstagramFilled />
              </a>
              <a href="#">
                <DiscordFilled />
              </a>
            </div>
          </div>

          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p>
              <i className="fas fa-map-marker-alt" /> 123 Salon Street, Your
              City
            </p>
            <p>
              <i className="fas fa-phone" /> +1 (123) 456-7890
            </p>
            <p>
              <i className="fas fa-envelope" /> info@hairharmony.com
            </p>
          </div>
        </div>
        <div className="footer-bottom">© 2024 HairHarmony</div>
      </footer>
    </>
  );
}

export default Footer;
