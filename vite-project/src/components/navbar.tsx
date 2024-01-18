import React from "react";
import AzimaLogo from "../assets/AzimaLogo.png";
import AccountIcon from "../assets/AccountIcon.png";
import LogoutIcon from "../assets/Logout.png";
import Notifications from "../assets/Notifications.png";
import Settings from "../assets/Settings.png";

const NavBar = () => {
  return (
    <div className="Navbar">
      <nav>
        <ul>
          <div className="right">
            <a href="#">
              <img src={AzimaLogo} alt="Azima Logo" />
            </a>
            <div className="temp">
              <li className="nav-item">
                <a href="#">
                  <img src={Notifications} alt="Azima Logo" />
                </a>
              </li>
              <li className="nav-item">
                <a href="#">
                  <img src={AccountIcon} alt="Azima Logo" />
                </a>
              </li>
              <li className="nav-item">
                <a href="#">
                  <img src={Settings} alt="Azima Logo" />
                </a>
              </li>
              <li className="nav-item">
                <a href="#">
                  <img src={LogoutIcon} alt="Azima Logo" />
                </a>
              </li>
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
