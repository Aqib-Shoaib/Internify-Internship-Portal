/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Modal from "../../components/utils/Modal";
import ModalNav from "./ModalNav";
import Navigation from "./Navigation";

const MenuIcon = styled.span`
  font-size: 5rem;
  color: var(--color-light);
  cursor: pointer;
  padding: 1rem;

  @media (min-width: 992px) {
    display: none;
  }
`;

const StyledNav = styled.nav`
  display: none;

  @media (min-width: 992px) {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--fs-subheading);
    font-weight: var(--fw-regular);

    a {
      /* border-bottom: 0.5px solid var(--color-accent); */
      margin: 0 1rem;
      letter-spacing: 1px;
      text-transform: uppercase;

      &:hover {
        color: var(--color-light);
      }
    }
    button {
      background: var(--button-primary-bg);
      font-size: var(--fs-heading);
      padding: 1rem;
      border-radius: 10px;
      color: #fff;
      letter-spacing: 2px;
      transition: all 0.3s linear;

      &:hover {
        box-shadow: 0 0px 8px rgba(0, 0, 0, 0.2);
        background: var(--button-primary-hover);
        transform: scaleX(1.1);
      }
    }

    @media (min-width: 1280px) {
      font-size: var(--fs-heading);
      gap: 2rem;
      margin-right: 3rem;

      a {
        letter-spacing: 2px;
      }
    }
  }
`;

function Nav({ showNavModal, setShowNavModal }) {
  function closeModal() {
    setShowNavModal(false);
  }
  return (
    <div>
      {!showNavModal && (
        <MenuIcon onClick={() => setShowNavModal(true)}>
          <FontAwesomeIcon icon={faBars} beat />
        </MenuIcon>
      )}

      {/* this modal shows navigation within a modal on smaller devices of break point lower than 992px */}
      <Modal
        isOpen={showNavModal}
        onClose={closeModal}
        shouldAutoCloseOnResize={true}
      >
        <ModalNav />
      </Modal>

      <StyledNav>
        <Navigation />
      </StyledNav>
    </div>
  );
}

export default Nav;
