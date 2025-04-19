/* eslint-disable react/prop-types */
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const StyledArrayBox = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 0.5rem;
  margin-bottom: 1rem;
  background: #fff;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.11);

  .h2 {
    font-size: var(--fs-body);
  }

  .array {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .array-item {
    background: var(--color-contrast);
    padding: 0.5rem 1rem;
    border-radius: 10px;
    color: var(--color-light);
    font-size: var(--fs-small);
  }

  .add-more-btn {
    width: 4rem;
    border-radius: 10px;
    background: var(--color-medium-light);

    &:hover {
      background: var(--color-light);
    }
  }
`;

function Arraybox({ list, title }) {
  return (
    <StyledArrayBox>
      <h2 className='h2'>{title}:</h2>

      <div className='array'>
        {list.map((item, index) => (
          <p className='array-item' key={index}>
            {item}
          </p>
        ))}
        <button type='button' className='add-more-btn'>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </StyledArrayBox>
  );
}

export default Arraybox;
