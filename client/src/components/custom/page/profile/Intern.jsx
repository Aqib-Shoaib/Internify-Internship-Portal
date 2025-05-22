import Applications from "./InternDashboard.jsx/Applications";
import Dashboard from "./InternDashboard.jsx/Dashboard";
import InternProfile from "./InternDashboard.jsx/InternProfile";
import Resumes from "./InternDashboard.jsx/Resumes";
import InternSavedInternshipsTab from "./InternDashboard.jsx/SavedInternship";
import UpdatePassword from "./UpdatePassword";

/* eslint-disable react/prop-types */
function Intern({ selectedTab }) {
  return (
    <div>
      {selectedTab === "Dashboard" && <Dashboard />}
      {selectedTab === "Profile" && <InternProfile />}
      {selectedTab === "Applications" && <Applications />}
      {selectedTab === "Resumes" && <Resumes />}
      {selectedTab === "SavedInternship" && <InternSavedInternshipsTab />}
      {selectedTab === "UpdatePassword" && <UpdatePassword />}
    </div>
  );
}

export default Intern;
