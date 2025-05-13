import Nav from "./nav/Nav";
import { useState } from "react";

function Header() {
  const [showNavModal, setShowNavModal] = useState(false);

  return (
    <header className='bg-[var(--color-dark)] w-full h-[90px] z-[999] overflow-hidden'>
      <div className='relative w-full h-full' data-aos='fade-down'>
        <img
          src='/logo.svg'
          alt='Internify logo'
          className='h-[70%] absolute top-1/2 left-[5px] -translate-y-1/2'
        />
        <Nav showNavModal={showNavModal} setShowNavModal={setShowNavModal} />
      </div>
    </header>
  );
}

export default Header;
