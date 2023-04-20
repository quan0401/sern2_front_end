import "./Navigation.scss";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div className="topnav">
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/user-table">Users table</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/login" className="split">
        Logout
      </NavLink>
    </div>
  );
}

export default Navigation;
