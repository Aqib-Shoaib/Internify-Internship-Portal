import CompanyHr from "../components/custom/page/profile/CompanyHr";
import Intern from "../components/custom/page/profile/Intern";
import { HR_USER } from "../dummy/user";
// import {  INTERN_USER } from "../dummy/user";

function ProfilePage() {
  const user = HR_USER;
  // const user = INTERN_USER;

  return (
    <div className='py-0 px-4 md:px-10'>
      {user.user_type === "INTERN" ? (
        <Intern user={user} />
      ) : (
        <CompanyHr user={user} />
      )}
    </div>
  );
}

export default ProfilePage;
