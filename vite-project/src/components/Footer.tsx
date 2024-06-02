import React from "react";

import Dropdown from "./Dropdown";
import AzimaLogo from "../assets/AzimaLogo.png";
import GooglePlay from "../assets/GooglePlay.png";
import AppStore from "../assets/AppleStore.png";

import "../Styles/footer.css";

export const Footer = () => {
  return (
    <footer>
      <div className="upper">
        <img src={AzimaLogo} alt="Logo" className="logofooter" />

        {/* Resources Section */}
        <div className="resources">
          <label className="footer-header" htmlFor="Resources">
            Resources
          </label>
          <a className="clickable" href="">
            <label htmlFor="About us">About us</label>
          </a>
          <a className="clickable" href="">
            <label htmlFor="Privacy">Privacy</label>
          </a>
          <a className="clickable" href="">
            <label htmlFor="Terms">Terms</label>
          </a>
        </div>

        {/* Discover Section */}
        <div className="discover">
          <label className="footer-header" htmlFor="discover">
            Discover
          </label>
          <a className="clickable" href="">
            <label htmlFor="Groups">Groups</label>
          </a>
          <a className="clickable" href="">
            <label htmlFor="Events">Events</label>
          </a>
        </div>

        {/* Download Section */}
        <div className="download">
          <label className="footer-header" htmlFor="Download">
            Download Azima App
          </label>
          <img src={GooglePlay} alt="" className="google" />
          <img src={AppStore} alt="" className="appstore" />
        </div>
      </div>
    </footer>
  );
};
