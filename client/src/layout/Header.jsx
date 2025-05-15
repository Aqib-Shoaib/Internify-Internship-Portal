import Nav from "./nav/Nav";
import { useState } from "react";

function Header() {
  const [showNavModal, setShowNavModal] = useState(false);

  return (
    <header className='bg-sidebar w-full h-[90px] z-[999] overflow-hidden fixed'>
      <div
        className='flex items-center justify-between h-full !p-5 w-full relative'
        data-aos='fade-down'
      >
        <img src='/logo.svg' alt='Internify logo' className='h-[70px] w-fit' />
        <Nav showNavModal={showNavModal} setShowNavModal={setShowNavModal} />
      </div>
    </header>
  );
}

export default Header;
