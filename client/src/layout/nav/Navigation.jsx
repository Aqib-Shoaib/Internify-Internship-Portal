import { NavLink, useNavigate } from "react-router-dom";
import { HR_USER, INTERN_USER } from "../../dummy/user";
import ProfileBtn from "../../components/custom/page/profile/ProfileBtn";
import { Button } from "@/components/ui/button";

function Navigation() {
  const navigate = useNavigate();

  // const user = HR_USER;
  // const user = INTERN_USER;
  const user = undefined;

  const userObject = {
    photo: "",
    displayName: "",
    url: "",
  };
  // userObject.photo = user.user_type === "INTERN" ? user.profilePic : user.logo;
  // userObject.displayName =
  //   user.user_type === "INTERN" ? user.fullName : user.companyName;

  return (
    <nav className='flex flex-col md:flex-row items-center gap-6 text-lg tracking-wide font-medium text-foreground'>
      <NavLink
        to='/'
        className='transition-colors duration-200 hover:text-background hover:bg-foreground p-2 rounded-md'
      >
        Home
      </NavLink>
      <NavLink
        to='#'
        className='transition-colors duration-200 hover:text-background hover:bg-foreground p-2 rounded-md'
      >
        About Us
      </NavLink>
      <NavLink
        to='/internship'
        className='transition-colors duration-200 hover:text-background hover:bg-foreground p-2 rounded-md'
      >
        Internships
      </NavLink>
      <NavLink
        to='#'
        className='transition-colors duration-200 hover:text-background hover:bg-foreground p-2 rounded-md'
      >
        Contact Us
      </NavLink>

      {user ? (
        <ProfileBtn userObject={userObject} />
      ) : (
        <Button
          variant='secondary'
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
