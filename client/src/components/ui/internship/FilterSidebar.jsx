import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Modal from "../../utils/Modal";
import Filter from "./Filter";

const StyledSidebar = styled.div`
  padding: 1.5rem;
  border-right: 1px solid var(--color-dark);
  position: relative;
`;

const FilterIcon = styled.span`
  font-size: var(--fs-heading);
  color: var(--color-dark);
  cursor: pointer;
  position: absolute;
  left: 10px;
  top: 3px;

  @media (min-width: 992px) {
    display: none;
  }
`;

const StyledNav = styled.div`
  display: none;

  @media (min-width: 992px) {
    display: block;
    font-size: var(--fs-body);
    font-weight: var(--fw-regular);
  }
`;

function FilterSidebar() {
  const [showFilter, setShowFilter] = useState(false);
  function closeModal() {
    setShowFilter(false);
  }
  return (
    <StyledSidebar>
      <FilterIcon onClick={() => setShowFilter(true)}>
        <FontAwesomeIcon icon={faFilter} fade />
      </FilterIcon>

      {/* this modal shows navigation within a modal on smaller devices of break point lower than 992px */}
      <Modal
        isOpen={showFilter}
        onClose={closeModal}
        shouldAutoCloseOnResize={true}
      >
        <Filter />
      </Modal>

      <StyledNav>
        <Filter />
      </StyledNav>
    </StyledSidebar>
  );
}

export default FilterSidebar;
