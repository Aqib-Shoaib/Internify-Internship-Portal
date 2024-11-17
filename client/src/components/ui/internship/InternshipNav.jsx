import styled from "styled-components";
import RangeSelector from "../../utils/RangeSelector";

const StyledNav = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    to bottom,
    var(--color-dark),
    var(--color-medium-dark) 70%
  );
  width: 100%;
  justify-content: space-evenly;

  .flex {
    display: flex;
    gap: 20px;
  }

  .input {
    border: none;
    outline: none;
    padding: 5px;
    font-size: var(--fs-body);
    color: var(--color-light);
    background: transparent;
    margin: 1rem;
    option {
      color: black;
    }
  }

  .border-bottom {
    border-bottom: 1px solid var(--color-light);
  }

  .rangeBox {
    display: flex;
    /* flex-direction: column; */
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    span {
      font-size: var(--fs-small);
    }
  }
  .vertical {
    display: none;
    color: var(--color-light);
  }
`;

function InternshipNav() {
  return (
    <StyledNav>
      <input
        type="text"
        placeholder="Search Internship..."
        className="input border-bottom"
      />
      <span className="vertical">|</span>
      <select className="input">
        <option value="month">Per Month</option>
        <option value="hour">Per Hour</option>
        <option value="task">Per Task</option>
      </select>

      <span className="vertical">|</span>
      <input
        className="input border-bottom"
        type="text"
        placeholder="location"
      />
      <span className="vertical">|</span>
      <div className="input rangeBox">
        <span>Salary Range</span>
        <RangeSelector min={10} max={35} cname="flex" />
      </div>
    </StyledNav>
  );
}

export default InternshipNav;
