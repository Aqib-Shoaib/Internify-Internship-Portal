import Candidates from "./CompanyDashboard/Candidates";
import CompanyProfile from "./CompanyDashboard/CompanyProfile";
import Dashboard from "./CompanyDashboard/Dashboard";
import Internships from "./CompanyDashboard/Internships";

/* eslint-disable react/prop-types */
function CompanyHr({ selectedTab }) {
  return (
    <div>
      {selectedTab === "Dashboard" && <Dashboard />}
      {selectedTab === "Profile" && <CompanyProfile />}
      {selectedTab === "Internships" && <Internships />}
      {selectedTab === "Candidates" && <Candidates />}
    </div>
  );
}

export default CompanyHr;
