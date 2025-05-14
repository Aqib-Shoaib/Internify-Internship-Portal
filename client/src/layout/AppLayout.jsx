import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className='max-w-screen overflow-hidden'>
      <main className='w-screen overflow-hidden'>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
