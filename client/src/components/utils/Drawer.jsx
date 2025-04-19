/* eslint-disable react/prop-types */
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const StyledDrawer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.3);
`;

const Mainbox = styled.div`
  background: #fff;
  border-radius: 10px;
  width: 35%;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  padding: 2rem;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  border: 0.5px solid var(--color-accent);
`;

const TitleSection = styled.div`
  border-bottom: 1px solid var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--fs-large);

  .icon {
    cursor: pointer;
  }
  .title {
    text-transform: capitalize;
  }
`;

const ChildrenBox = styled.div`
  overflow-y: scroll;
  scroll-behavior: smooth;
  height: calc(100vh - 100px);
  margin: 2rem 0;
`;

function Drawer({ children, isOpen, onClose, title }) {
  // early return in case drawer is not opened
  if (!isOpen) return null;

  return (
    <StyledDrawer>
      <Mainbox>
        <TitleSection>
          <h2 className='title'>{title.toLowerCase()}</h2>
          <span onClick={onClose} className='icon'>
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </TitleSection>
        <ChildrenBox className='custom-scrollbar'>{children}</ChildrenBox>
      </Mainbox>
    </StyledDrawer>
  );
}

export default Drawer;
