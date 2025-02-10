import { NavLink, useNavigate } from "react-router-dom";
import { HR_USER, INTERN_USER } from "../../dummy/user";
import ProfileBtn from "../../components/ui/profile/ProfileBtn";

function Navigation() {
  const navigate = useNavigate();

  // const user = HR_USER;
  const user = INTERN_USER;

  const userObject = {
    photo: "",
    displayName: "",
    url: "",
  };
  userObject.photo = user.user_type === "INTERN" ? user.profilePic : user.logo;
  userObject.displayName =
    user.user_type === "INTERN" ? user.fullName : user.companyName;
  return (
    <>
      <NavLink to='/'>Home</NavLink>
      <NavLink>About Us</NavLink>
      <NavLink to='/internship'>Internships</NavLink>
      <NavLink>Contact Us</NavLink>
      {user ? (
        <ProfileBtn userObject={userObject} />
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}
    </>
  );
}

export default Navigation;
