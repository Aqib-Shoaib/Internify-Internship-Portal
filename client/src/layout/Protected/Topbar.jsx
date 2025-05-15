import { Button } from "@/components/ui/button";
import { INTERN_USER } from "@/dummy/user";

function Topbar() {
  const user = INTERN_USER;
  return (
    <div className='w-full bg-popover h-20 p-4'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <img
            src={`/${user?.profilePic}`}
            alt='Profile'
            className='w-10 h-10 rounded-full'
          />
          <span className='text-lg font-semibold'>{user?.fullName}</span>
        </div>
        <Button variant='outline'>Logout</Button>
      </div>
    </div>
  );
}

export default Topbar;
