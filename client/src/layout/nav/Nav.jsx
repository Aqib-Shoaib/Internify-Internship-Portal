/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Modal from "../../components/utils/Modal";
import ModalNav from "./ModalNav";
import Navigation from "./Navigation";

const MenuIcon = styled.span`
  font-size: var(--fs-heading);
  color: var(--color-light);
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);

  @media (min-width: 992px) {
    display: none;
  }
`;

const StyledNav = styled.nav`
  display: none;

  @media (min-width: 992px) {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--fs-body);
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
      font-size: var(--fs-body);
      padding: 1rem;
      border-radius: 10px;
      color: #fff;
      letter-spacing: 1px;
      transition: all 0.3s linear;

      &:hover {
        box-shadow: 0 0px 8px rgba(0, 0, 0, 0.2);
        background: var(--button-primary-hover);
        transform: scaleX(1.1);
      }
    }

    @media (min-width: 1280px) {
      font-size: var(--fs-body);
      gap: 1.5rem;

      a {
        letter-spacing: 1px;
      }
    }
  }
`;

function Nav({ showNavModal, setShowNavModal }) {
  function closeModal() {
    setShowNavModal(false);
  }
  return (
    <>
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
    </>
  );
}

export default Nav;
