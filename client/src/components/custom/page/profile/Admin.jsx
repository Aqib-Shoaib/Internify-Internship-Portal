import AdminCompanyVerificationTab from "./Admin/CompanyVerification";
import CreateAdmin from "./Admin/CreateAdmin";
import Dashboard from "./Admin/Dashboard";
import AdminInternshipVerificationTab from "./Admin/InternshipsVerification";
import AdminUsersTab from "./Admin/Userrs";
import UpdatePassword from "./UpdatePassword";

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
      {selectedTab === "CreateAdmin" && <CreateAdmin />}
      {selectedTab === "UpdatePassword" && <UpdatePassword />}
    </div>
  );
}

export default Admin;
