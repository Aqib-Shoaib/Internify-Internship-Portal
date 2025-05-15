import { HR_USER, INTERN_USER } from "@/dummy/user";
import {
  BriefcaseBusinessIcon,
  FileUser,
  LucideHome,
  User2Icon,
  UserSearch,
  VerifiedIcon,
} from "lucide-react";
import { useState } from "react";
import SidebarNavigation from "./SidebarNavigation";

const SIDEBAR_NAV = {
  INTERN: [
    {
      name: "Dashboard",
      icon: <LucideHome />,
    },
    {
      name: "Profile",
      icon: <User2Icon />,
    },
    {
      name: "Applications",
      icon: <BriefcaseBusinessIcon />,
    },
    {
      name: "Resumes",
      icon: <FileUser />,
    },
  ],

  COMPANY: [
    {
      name: "Dashboard",
      icon: <LucideHome />,
    },
    {
      name: "Profile",
      icon: <User2Icon />,
    },
    {
      name: "Internships",
      icon: <BriefcaseBusinessIcon />,
    },
  ],
  ADMIN: [
    {
      name: "Dashboard",
      icon: <LucideHome />,
    },
    {
      name: "Users",
      icon: <UserSearch />,
    },
    {
      name: "Verifications",
      icon: <VerifiedIcon />,
    },
  ],
};

function Sidebar() {
  //   const user = HR_USER;
  const user = INTERN_USER;
  const navItems = SIDEBAR_NAV[user?.user_type || "INTERN"];
  const [selectedTab, setSelectedTab] = useState(navItems[0].name);
  return (
    <aside className='w-64 bg-foreground text-background h-dvh max-h-dvh p-4'>
      <div>
        <img src='/logo.svg' alt='logo' className='h-14 mb-10' />
        <SidebarNavigation
          navItems={navItems}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
    </aside>
  );
}

export default Sidebar;
