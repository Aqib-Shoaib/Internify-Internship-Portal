import AdminCompanyVerificationTab from "./Admin/CompanyVerification";
import Dashboard from "./Admin/Dashboard";
import AdminInternshipVerificationTab from "./Admin/InternshipsVerification";
import AdminUsersTab from "./Admin/Userrs";

/* eslint-disable react/prop-types */
function Admin({ selectedTab }) {
  return (
    <div>
      {selectedTab === "Dashboard" && <Dashboard />}
      {selectedTab === "Users" && <AdminUsersTab />}
      {selectedTab === "InternshipsVerified" && (
        <AdminInternshipVerificationTab />
      )}
      {selectedTab === "CompaniesVerified" && <AdminCompanyVerificationTab />}
    </div>
  );
}

export default Admin;
