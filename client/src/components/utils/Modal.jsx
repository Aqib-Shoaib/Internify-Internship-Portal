/* eslint-disable react/prop-types */
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledModal = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  width: 500px;
  max-width: 90%;
`;

const Btn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  padding: 3px 10px;
  border-radius: 10px;
  font-size: var(--fs-heading);
  font-weight: var(--fw-medium);
  background: transparent;
  color: var(--button-primary-bg);
  cursor: pointer;
`;

function Modal({ isOpen, onClose, children, shouldAutoCloseOnResize = false }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  // automatic closing of modal window where a certain breakpoint is crossed
  useEffect(() => {
    if (isOpen && shouldAutoCloseOnResize) {
      const handleResize = (e) => {
        if (e.matches) {
          onClose(); // Close the modal if viewport is larger than 768px
        }
      };

      const mediaQuery = window.matchMedia("(min-width: 768px)");
      mediaQuery.addEventListener("change", handleResize);

      // Clean up the event listener on component unmount or modal close
      return () => mediaQuery.removeEventListener("change", handleResize);
    }
  }, [isOpen, onClose, shouldAutoCloseOnResize]);

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <Btn onClick={onClose}>
          <FontAwesomeIcon icon={faRectangleXmark} beatFade />
        </Btn>
        {children}
      </StyledModal>
    </Overlay>,
    document.getElementById("modal-root")
  );
}

export default Modal;
