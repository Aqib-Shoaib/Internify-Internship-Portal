/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

function ProfileBtn({ userObject }) {
  const splitArray = userObject.displayName.split(" ");
  const finalName = splitArray[0] + " " + splitArray[1][0] + ".";
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/profile")}
      className='cursor-pointer flex items-center gap-2 border border-muted px-2 py-1 rounded-xl transition-all duration-300 hover:border-foreground hover:-translate-x-4'
    >
      <div className='w-6 h-6 rounded-full overflow-hidden'>
        <img
          src={userObject.photo}
          alt='user photo or logo'
          className='w-full h-full object-cover'
        />
      </div>
      <span className='text-sm font-medium text-muted-foreground'>
        {finalName}
      </span>
    </div>
  );
}

export default ProfileBtn;
