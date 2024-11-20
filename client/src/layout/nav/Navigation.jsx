import { NavLink, useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink>About Us</NavLink>
      <NavLink to="/internship">Internships</NavLink>
      <NavLink>Contact Us</NavLink>
      <button onClick={() => navigate("/login")}>Login</button>
    </>
  );
}

export default Navigation;
