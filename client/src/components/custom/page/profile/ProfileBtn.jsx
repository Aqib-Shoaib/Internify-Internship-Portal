/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

function ProfileBtn({ userObject }) {
  const splitArray = userObject.name.split(" ");
  const finalName = splitArray[0] + " " + splitArray[1][0] + ".";
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/dashboard/profile")}
      className='cursor-pointer flex items-center gap-2 border border-muted p-2 rounded-xl transition-all duration-300 hover:-translate-x-4'
    >
      <div className='w-8 h-8 rounded-full overflow-hidden'>
        <img
          src={userObject.profileImage || "/user.png"}
          alt='user photo or logo'
          className='w-full h-full object-cover'
        />
      </div>
      <span className='text-base md:text-lg font-medium text-secondary-foreground'>
        {finalName}
      </span>
    </div>
  );
}

export default ProfileBtn;
