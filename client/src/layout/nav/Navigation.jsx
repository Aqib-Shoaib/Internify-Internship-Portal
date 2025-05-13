import { NavLink, useNavigate } from "react-router-dom";
import { HR_USER, INTERN_USER } from "../../dummy/user";
import ProfileBtn from "../../components/custom/page/profile/ProfileBtn";
import { Button } from "@/components/ui/button";

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
    <nav className='flex items-center gap-6 text-base font-medium text-white'>
      <NavLink
        to='/'
        className='hover:text-gray-300 transition-colors duration-200'
      >
        Home
      </NavLink>
      <NavLink
        to='#'
        className='hover:text-gray-300 transition-colors duration-200'
      >
        About Us
      </NavLink>
      <NavLink
        to='/internship'
        className='hover:text-gray-300 transition-colors duration-200'
      >
        Internships
      </NavLink>
      <NavLink
        to='#'
        className='hover:text-gray-300 transition-colors duration-200'
      >
        Contact Us
      </NavLink>

      {user ? (
        <ProfileBtn userObject={userObject} />
      ) : (
        <Button
          variant='outline'
          onClick={() => navigate("/login")}
          className='ml-4 text-gray-900 border-white hover:bg-gray-200 transition-all duration-200'
        >
          Login
        </Button>
      )}
    </nav>
  );
}

export default Navigation;
