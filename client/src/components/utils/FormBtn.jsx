import styled from "styled-components";

const Button = styled.div`
  font-size: var(--fs-body);
  font-weight: var(--fw-medium);
  grid-column: 2;
  grid-column: 1/-1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-end;
  }

  .button {
    background-color: var(--color-dark);
    padding: 10px 15px;
    border-radius: 5px;
    color: var(--color-light);

    &:hover {
      filter: brightness(2);
    }
  }
`;

export default Button;
