import { NavLink } from "react-router-dom";
import "../Styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div></div>
      <div className="navMenu">
        <div className="navMenuRight">
          <NavLink to="/" className="navLink">
            Home
          </NavLink>
          <NavLink to="/register" className="navLink">
            Register
          </NavLink>
          <NavLink to="/login" className="navLink">
            Login
          </NavLink>
          <NavLink to="/cart" className="navLink">
            Cart
          </NavLink>
          <NavLink to="/profile" className="navLink">
            Profile
          </NavLink>
          <NavLink to="/logout" className="navLink">
            Logout
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
