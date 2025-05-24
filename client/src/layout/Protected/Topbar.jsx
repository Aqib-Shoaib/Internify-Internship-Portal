/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { logout } from "@/Slices/userSlice";
import { LucideLogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Topbar({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className='w-full bg-popover h-16 md:h-20 p-4'>
      <div className='flex justify-between items-center' data-aos='fade-up'>
        <div className='flex items-center gap-2 md:gap-4'>
          <img
            src={user?.profileImage || "/user.png"}
            alt='Profile'
            className='w-7 md:w-10 h-7 md:h-10 rounded-full'
          />
          <span className='text-base md:text-lg font-semibold'>
            {user?.name}
          </span>
        </div>
        <div className='flex items-center gap-1'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => navigate("/internship")}
          >
            <span>Browse Internships</span>
          </Button>
          <Button variant='outline' size='sm' onClick={handleLogout}>
            <span className='hidden md:block'>Logout</span>
            <span className='block md:hidden'>
              <LucideLogOut />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
