import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
// import { ThemeToggle } from "@/components/custom/utils/ThemeToggle";

function AppLayout() {
  return (
    <div className='max-w-screen overflow-hidden'>
      <Header />
      <main className='w-screen overflow-hidden'>
        <Outlet />
      </main>
      <Footer />
      {/* <ThemeToggle /> */}
    </div>
  );
}

export default AppLayout;
