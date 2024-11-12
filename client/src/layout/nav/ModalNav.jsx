import styled from "styled-components";
import Navigation from "./Navigation";

const StyledNav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;

  a {
    color: var(--color-accent);
    font-size: 2.5rem;
    font-weight: var(--fw-medium);
    padding: 5px;
    border-radius: 5px;
    transition: all 0.3s ease;

    &:hover {
      background: var(--color-medium-dark);
      color: #fff;
    }
  }

  button {
    background: var(--button-primary-bg);
    color: var(--button-primary-text);
    padding: 10px;
    font-size: 2rem;
    border-radius: 10px;

    &:hover {
      background: var(--color-dark);
    }
  }
`;

function ModalNav() {
  return (
    <StyledNav>
      <Navigation />
    </StyledNav>
  );
}

export default ModalNav;
