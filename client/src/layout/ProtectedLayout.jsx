import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  //   const token = localStorage.getItem("token");
  const token = 1;
  if (!token) return <Navigate to='/login' replace />;

  return (
    <div>
      <Outlet />
    </div>
  );
}
