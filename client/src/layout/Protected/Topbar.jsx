/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Topbar({ user }) {
  const navigate = useNavigate();
  return (
    <div className='w-full bg-popover h-20 p-4'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <img
            src={user?.profileImage}
            alt='Profile'
            className='w-10 h-10 rounded-full'
          />
          <span className='text-lg font-semibold'>{user?.name}</span>
        </div>
        <div className='flex items-center gap-1'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => navigate("/internship")}
          >
            Browse Internships
          </Button>
          <Button variant='outline' size='sm'>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
