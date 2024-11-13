import styled from "styled-components";
import Nav from "./nav/Nav";
import { useState } from "react";

const Logo = styled.img`
  width: fit-content;
  height: fit-content;
  position: absolute;
  top: 5px;
  left: 5px;
`;
const StyledHeader = styled.header`
  background: var(--color-dark);
  height: 110px;
  width: 100%;
  z-index: 999;
  overflow: hidden;
  position: fixed;

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
      <div className="header">
        <Logo src="/logo.svg" alt="Internify logo" />
        <Nav showNavModal={showNavModal} setShowNavModal={setShowNavModal} />
      </div>
    </StyledHeader>
  );
}

export default Header;
