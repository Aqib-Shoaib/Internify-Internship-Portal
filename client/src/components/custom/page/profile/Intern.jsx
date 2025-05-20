import Applications from "./InternDashboard.jsx/Applications";
import Dashboard from "./InternDashboard.jsx/Dashboard";
import InternProfile from "./InternDashboard.jsx/InternProfile";
import Resumes from "./InternDashboard.jsx/Resumes";
import InternSavedInternshipsTab from "./InternDashboard.jsx/SavedInternship";

/* eslint-disable react/prop-types */
function Intern({ selectedTab }) {
  return (
    <div>
      {selectedTab === "Dashboard" && <Dashboard />}
      {selectedTab === "Profile" && <InternProfile />}
      {selectedTab === "Applications" && <Applications />}
      {selectedTab === "Resumes" && <Resumes />}
      {selectedTab === "SavedInternship" && <InternSavedInternshipsTab />}
    </div>
  );
}

export default Intern;
