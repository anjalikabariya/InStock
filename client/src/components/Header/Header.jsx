import React from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import logo from "../../assets/Logo/InStock-Logo.svg";

const Header = () => {
  return (
    <nav className="nav">
      <div className="nav__container">
        {/* LOGO SECTION */}
        <NavLink to="/">
          <img className="nav__logo" src={logo} alt="InStock-Logo" />
        </NavLink>
        {/* LOGO SECTION */}
        {/* ----------------- */}
        {/* NAVIGATION LINKS */}
        <ul className="nav__menu">
          <NavLink
            to="/warehouse"
            activeClassName="nav__menu-link--active"
            className="nav__menu-link"
          >
            Warehouses
          </NavLink>
          <NavLink
            to="/inventory"
            activeClassName="nav__menu-link--active"
            className="nav__menu-link"
          >
            Inventory
          </NavLink>
        </ul>
        {/* NAVIGATION LINKS */}
      </div>
    </nav>
  );
};

export default Header;
