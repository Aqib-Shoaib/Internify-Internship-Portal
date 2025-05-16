import { NavLink, useNavigate } from "react-router-dom";
import { user } from "../../dummy/user";
import ProfileBtn from "../../components/custom/page/profile/ProfileBtn";
import { Button } from "@/components/ui/button";

function Navigation() {
  const navigate = useNavigate();

  return (
    <nav className='flex flex-col md:flex-row justify-start md:justify-center items-start md:items-center gap-6 text-lg tracking-wide font-medium text-sidebar-foreground'>
      <NavLink
        to='/'
        className='transition-colors duration-200 hover:text-background hover:bg-foreground p-2 rounded-md'
      >
        Home
      </NavLink>
      <NavLink
        to='/internship'
        className='transition-colors duration-200 hover:text-background hover:bg-foreground p-2 rounded-md'
      >
        Internships
      </NavLink>
      <NavLink
        to='/contact'
        className='transition-colors duration-200 hover:text-background hover:bg-foreground p-2 rounded-md'
      >
        Contact Us
      </NavLink>

      {user ? (
        <ProfileBtn userObject={user} />
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
