/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledRole = styled.div`
  display: flex;
  border: 1px solid var(--color-light);
  border-radius: 10px;
  justify-content: space-between;
  width: 100%;
  padding: 5px;

  @media (min-width: 1200px) {
    flex-direction: column;
  }

  .label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: var(--space-sm) 0;
    .precaution {
      font-size: 1.2rem;
      font-weight: var(--fw-light);
      color: var(--color-warning);
    }
  }

  .roles {
    display: flex;
    gap: var(--space-xs);
    flex-direction: column;

    @media (min-width: 768px) {
      align-items: center;
      justify-content: center;
      flex-direction: row;
    }
  }

  .role {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
    border: 1px solid var(--color-light);
    margin: 0px var(--space-xs);
    border-radius: 10px;
    padding: 5px;
    width: fit-content;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: var(--fs-medium);

    &:hover {
      border-color: var(--color-medium-dark);
    }

    img {
      width: 30px;
    }
  }
  .selected {
    border: 2px solid var(--color-dark);
  }
`;

// role types
const INTERN = "INTERN";
const COMPANY = "COMPANY";

function Role({ role, setUserRole }) {
  function setInternRole() {
    setUserRole(INTERN);
  }

  function setCompanyRole() {
    setUserRole(COMPANY);
  }

  return (
    <StyledRole>
      <div className='label'>
        <label>Choose Your Role</label>
        <span className='precaution'>This can&apos;t be changed later!</span>
      </div>
      <div className='roles'>
        <div
          className={`role ${role === "INTERN" && "selected"}`}
          onClick={setInternRole}
        >
          <img src='/student_vector.svg' alt='student vector image' />
          <span>Intern</span>
        </div>
        <div
          className={`role ${role === "COMPANY" && "selected"}`}
          onClick={setCompanyRole}
        >
          <img src='/hr_vector.svg' alt='human resource hiring image' />
          <span>HR / Company</span>
        </div>
      </div>
    </StyledRole>
  );
}

export default Role;
