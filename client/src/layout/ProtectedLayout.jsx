import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Protected/Sidebar";
import Topbar from "./Protected/Topbar";

export default function ProtectedLayout() {
  //   const token = localStorage.getItem("token");
  const token = 1;
  if (!token) return <Navigate to='/login' replace />;

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 flex flex-col'>
        <Topbar />
        <main className='px-6 py-3'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
