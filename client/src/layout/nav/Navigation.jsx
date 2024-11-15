import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink>About Us</NavLink>
      <NavLink to="/internship">Internships</NavLink>
      <NavLink>Contact Us</NavLink>
      <button>Login</button>
    </>
  );
}

export default Navigation;
