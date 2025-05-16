import Applications from "./InternDashboard.jsx/Applications";
import Dashboard from "./InternDashboard.jsx/Dashboard";
import InternProfile from "./InternDashboard.jsx/InternProfile";
import Resumes from "./InternDashboard.jsx/Resumes";

/* eslint-disable react/prop-types */
function Intern({ selectedTab }) {
  return (
    <div>
      {selectedTab === "Dashboard" && <Dashboard />}
      {selectedTab === "Profile" && <InternProfile />}
      {selectedTab === "Applications" && <Applications />}
      {selectedTab === "Resumes" && <Resumes />}
    </div>
  );
}

export default Intern;
