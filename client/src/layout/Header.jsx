import styled from "styled-components";
import Nav from "./nav/Nav";
import { useState } from "react";

const Logo = styled.img`
  width: fit-content;
  height: fit-content;
`;
const StyledHeader = styled.header`
  background: var(--color-dark);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 1rem;
  height: 15vh;
`;

function Header() {
  const [showNavModal, setShowNavModal] = useState(false);

  return (
    <StyledHeader>
      <Logo src="/logo.svg" alt="Internify logo" />
      <Nav showNavModal={showNavModal} setShowNavModal={setShowNavModal} />
    </StyledHeader>
  );
}

export default Header;
