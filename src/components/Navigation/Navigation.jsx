import "./Navigation.scss";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="topnav">
      <Link className="active" to="/home">
        Home
      </Link>
      <Link to="/user-table">Users table</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/about">About</Link>
      <Link to="/login" className="split">
        Logout
      </Link>
    </div>
  );
}

export default Navigation;
