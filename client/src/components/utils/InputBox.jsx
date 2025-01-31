import styled from "styled-components";

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin: 3px;
  width: 100%;
  box-sizing: border-box;

  .label {
    font-size: var(--fs-small);
    font-weight: var(--fw-light);
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .input,
  .PhoneInputInput {
    padding: 5px;
    border: 1px solid var(--color-light);
    font-size: var(--fs-body);
    outline-color: var(--color-dark);
    color: var(--color-dark);
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;

    &::placeholder {
      color: var(--color-accent);
      font-size: var(--fs-small);
    }
  }
`;

export default InputBox;
