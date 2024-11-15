import styled from "styled-components";
import Nav from "./nav/Nav";
import { useState } from "react";

const Logo = styled.img`
  width: fit-content;
  height: 70%;
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
`;
const StyledHeader = styled.header`
  background: var(--color-dark);
  /* background: linear-gradient(to bottom, var(--color-dark) 80%, #f1f1f1); */
  /* background: #332a48; */

  height: 90px;
  width: 100%;
  z-index: 999;
  overflow: hidden;

  .header {
    position: relative;
    width: 100%;
    height: 100%;
  }
`;

function Header() {
  const [showNavModal, setShowNavModal] = useState(false);

  return (
    <StyledHeader>
      <div className="header" data-aos="fade-down">
        <Logo src="/logo.svg" alt="Internify logo" />
        <Nav showNavModal={showNavModal} setShowNavModal={setShowNavModal} />
      </div>
    </StyledHeader>
  );
}

export default Header;
