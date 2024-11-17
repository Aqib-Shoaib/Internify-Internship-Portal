import { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const StyledDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const Btn = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  .span {
    margin-left: 10px;
    font-size: var(--fs-small);
    transform: ${($props) => ($props.open ? "rotate(180deg)" : "rotate(0deg)")};
    transition: all 0.3 ease;
  }
`;

const Span = styled.span`
  padding: 8px 15px;
  cursor: pointer;
  font-size: var(--fs-small);
  color: var(--color-medium-dark);
  background: ${($props) => ($props.opt ? "#f5f5f5" : "#fff")};

  &:hover {
    color: var(--color-light);
    background: var(--color-dark);
  }
`;

const Opts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

function CustomDropdown() {
  const OPTIONS = ["Last updated", "Name", "Created date"];
  const [isOpen, setIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Last updated");

  const closeDropdown = () => {
    setIsOpen(false);
  };
  const openDropdown = () => {
    setIsOpen(true);
  };

  const selectOption = (option) => {
    setSortOption(option);
    setIsOpen(false);
  };

  return (
    <StyledDropdown>
      {/* Dropdown Trigger */}
      <Btn onClick={openDropdown}>
        Sort by: <span>{sortOption}</span>
        <span open={isOpen} className="span">
          ▼
        </span>
      </Btn>

      {/* Dropdown Options */}
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={closeDropdown}
          shouldAutoCloseOnResize={true}
        >
          <Opts>
            {OPTIONS.map((option) => (
              <Span
                opt={sortOption === option}
                key={option}
                onClick={() => selectOption(option)}
              >
                {option}
              </Span>
            ))}
          </Opts>
        </Modal>
      )}
    </StyledDropdown>
  );
}

export default CustomDropdown;
