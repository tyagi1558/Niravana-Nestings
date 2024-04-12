import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();
  const [modalOpened, setModalOpened] = useState(false);
  const { isAuthenticated, user, logout } = useAuth0();
 

  const handleAddPropertyClick = () => {
    setModalOpened(true);
  };

  // Function to handle click on the filter icon
  const handleFilterIconClick = (e) => {
    // Stop the propagation of the click event
    e.stopPropagation();
    // Toggle the menuOpened state to open/close the menu
    setMenuOpened((prev) => !prev);
  };

  return (
    <section className="h-wrapper" >
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <Link to="/">
          <img src="././logo.png" alt="logo" width={100} />
        </Link>

        {/* filter icon for mobile */}
        <div className="menu-icon" onClick={handleFilterIconClick}>
          <BiMenuAltRight size={30} />
        </div>

        {/* menu */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div
            className="flexCenter h-menu"
            style={getMenuStyles(menuOpened)}
            onClick={() => setMenuOpened(false)} // Close the menu on click outside
          >
            <NavLink to="/">Home</NavLink>
            <NavLink to="/bookVisit">Book Visit</NavLink>
            <NavLink to="/contactDetails">Contact Details</NavLink>
            <NavLink to="/profile">Profile</NavLink>


          </div>
        </OutsideClickHandler>
      </div>
    </section>
  );
};

export default Header;
