import CompanyHr from "../components/custom/page/profile/CompanyHr";
import Intern from "../components/custom/page/profile/Intern";
import { user } from "../dummy/user";
import Topbar from "@/layout/Protected/Topbar";
import { Link } from "react-router-dom";
import SidebarNavigation from "@/layout/Protected/SidebarNavigation";
import { useState } from "react";
import {
  BriefcaseBusinessIcon,
  FileUser,
  LucideHome,
  SaveIcon,
  User2Icon,
  Users2,
  UserSearch,
  Verified,
  VerifiedIcon,
} from "lucide-react";
import Admin from "@/components/custom/page/profile/Admin";

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
      icon: <Verified />,
    },
  ],
};

function ProfilePage() {
  const navItems = SIDEBAR_NAV[user?.role || "INTERN"];
  const [selectedTab, setSelectedTab] = useState(navItems[0].name);

  return (
    <div className='flex'>
      <aside className='w-64 bg-foreground text-background h-dvh max-h-dvh p-4'>
        <div>
          <Link to='/'>
            <img
              src='/logo.svg'
              alt='logo'
              className='h-14 mb-10 cursor-pointer'
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
        <main className='px-16 py-6 overflow-y-scroll h-[calc(100vh-80px)]'>
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
