import CompanyHr from "../components/custom/page/profile/CompanyHr";
import Intern from "../components/custom/page/profile/Intern";
import Topbar from "@/layout/Protected/Topbar";
import { Link } from "react-router-dom";
import SidebarNavigation from "@/layout/Protected/SidebarNavigation";
import { useState } from "react";
import {
  BriefcaseBusinessIcon,
  FileUser,
  LucideHome,
  RotateCcwKey,
  SaveIcon,
  ShieldAlert,
  User2Icon,
  UserCog2Icon,
  Users2,
  UserSearch,
  VerifiedIcon,
} from "lucide-react";
import Admin from "@/components/custom/page/profile/Admin";
import { useSelector } from "react-redux";

const SIDEBAR_NAV = {
  INTERN: [
    {
      name: "Dashboard",
      icon: <LucideHome />,
      label: "Dashboard",
    },
    {
      name: "Profile",
      label: "Profile",
      icon: <User2Icon />,
    },
    {
      name: "Applications",
      label: "Applications",
      icon: <BriefcaseBusinessIcon />,
    },
    {
      name: "Resumes",
      label: "Resumes",
      icon: <FileUser />,
    },
    {
      name: "SavedInternship",
      label: "Saved Internship",
      icon: <SaveIcon />,
    },
    {
      name: "UpdatePassword",
      icon: <RotateCcwKey />,
      label: "Update Password",
    },
  ],

  COMPANY: [
    {
      name: "Dashboard",
      label: "Dashboard",
      icon: <LucideHome />,
    },
    {
      name: "Profile",
      label: "Profile",
      icon: <User2Icon />,
    },
    {
      name: "Internships",
      label: "Internships",
      icon: <BriefcaseBusinessIcon />,
    },
    {
      name: "Candidates",
      label: "Candidates",
      icon: <Users2 />,
    },
    {
      name: "UpdatePassword",
      icon: <RotateCcwKey />,
      label: "Update Password",
    },
  ],
  ADMIN: [
    {
      name: "Dashboard",
      label: "Dashboard",
      icon: <LucideHome />,
    },
    {
      name: "Users",
      label: "Users",
      icon: <UserSearch />,
    },
    {
      name: "InternshipsVerified",
      label: "Internships Verified",
      icon: <VerifiedIcon />,
    },
    {
      name: "CompaniesVerified",
      label: "Companies Verified",
      icon: <ShieldAlert />,
    },
    {
      name: "CreateAdmin",
      icon: <UserCog2Icon />,
      label: "Create Admin",
    },
    {
      name: "UpdatePassword",
      icon: <RotateCcwKey />,
      label: "Update Password",
    },
  ],
};

function ProfilePage() {
  const { user } = useSelector((state) => state.user);
  const navItems = SIDEBAR_NAV[user?.role || "INTERN"];
  const [selectedTab, setSelectedTab] = useState(navItems[0].name);

  return (
    <div className='flex relative h-dvh'>
      <aside className='w-full md:w-64 bg-foreground text-background h-20 md:h-dvh md:max-h-dvh p-4 absolute md:static bottom-0 left-0 right-0 z-10'>
        <div>
          <Link to='/'>
            <img
              src='/logo.svg'
              alt='logo'
              className='hidden md:block h-14 md:mb-10 cursor-pointer'
            />
          </Link>
          <SidebarNavigation
            navItems={navItems}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>
      </aside>
      <div className='flex-1 flex flex-col'>
        <Topbar user={user} />
        <main className='px-4 md:px-16 py-3 md:py-6 overflow-y-scroll md:h-[calc(100vh-80px)] h-[calc(100vh-160px)]'>
          {user.role === "INTERN" && (
            <Intern user={user} selectedTab={selectedTab} />
          )}
          {user.role === "COMPANY" && (
            <CompanyHr user={user} selectedTab={selectedTab} />
          )}
          {user.role === "ADMIN" && (
            <Admin user={user} selectedTab={selectedTab} />
          )}
        </main>
      </div>
    </div>
  );
}

export default ProfilePage;
