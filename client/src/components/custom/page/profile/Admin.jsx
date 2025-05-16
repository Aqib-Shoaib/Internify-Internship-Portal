import CompanyVerification from "./Admin/CompanyVerification";
import Dashboard from "./Admin/Dashboard";
import InternshipsVerification from "./Admin/InternshipsVerification";
import Userrs from "./Admin/Userrs";

/* eslint-disable react/prop-types */
function Admin({ selectedTab }) {
  return (
    <div>
      {selectedTab === "Dashboard" && <Dashboard />}
      {selectedTab === "Users" && <Userrs />}
      {selectedTab === "InternshipsVerified" && <InternshipsVerification />}
      {selectedTab === "CompaniesVerified" && <CompanyVerification />}
    </div>
  );
}

export default Admin;
