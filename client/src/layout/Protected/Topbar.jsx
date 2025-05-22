/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { LucideLogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Topbar({ user }) {
  const navigate = useNavigate();
  return (
    <div className='w-full bg-popover h-16 md:h-20 p-4'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2 md:gap-4'>
          <img
            src={user?.profileImage}
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
          <Button variant='outline' size='sm'>
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
