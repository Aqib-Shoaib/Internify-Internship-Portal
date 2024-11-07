import styled from "styled-components";
import Nav from "./Nav";
import { useState } from "react";

const Logo = styled.img`
  width: 30%;
`;
const StyledHeader = styled.header`
  background: var(--color-dark);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 1rem;
`;

function Header() {
  const [showNavModal, setShowNavModal] = useState(false);

  return (
    <StyledHeader>
      <Logo src="/logo.png" alt="Internify logo" />
      <Nav showNavModal={showNavModal} setShowNavModal={setShowNavModal} />
    </StyledHeader>
  );
}

export default Header;
