/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Modal from "../components/utils/Modal";
import ModalNav from "./ModalNav";

const MenuIcon = styled.span`
  font-size: 5rem;
  color: var(--color-light);
  cursor: pointer;
  padding: 1rem;

  @media (min-width: 768px) {
    display: none;
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
          <FontAwesomeIcon icon={faEllipsisVertical} beat />
        </MenuIcon>
      )}

      {/* this modal shows navigation within a modal on smaller devices of break point lower than 768px */}
      <Modal
        isOpen={showNavModal}
        onClose={closeModal}
        shouldAutoCloseOnResize={true}
      >
        <ModalNav />
      </Modal>
    </div>
  );
}

export default Nav;
