import CompanyCandidatesTab from "./CompanyDashboard/Candidates";
import CompanyProfile from "./CompanyDashboard/CompanyProfile";
import Dashboard from "./CompanyDashboard/Dashboard";
import CompanyInternshipsTab from "./CompanyDashboard/Internships";

/* eslint-disable react/prop-types */
function CompanyHr({ selectedTab }) {
  return (
    <div>
      {selectedTab === "Dashboard" && <Dashboard />}
      {selectedTab === "Profile" && <CompanyProfile />}
      {selectedTab === "Internships" && <CompanyInternshipsTab />}
      {selectedTab === "Candidates" && <CompanyCandidatesTab />}
    </div>
  );
}

export default CompanyHr;
