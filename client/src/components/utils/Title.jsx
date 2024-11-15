import styled from "styled-components";

const Title = styled.h3`
  font-weight: var(--fw-bold);
  font-size: 3.75rem;
  text-align: center;
  margin: 0.5rem 0;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    height: 5px;
    border-radius: 10px;
    left: 50%;
    top: -10%;
    background: var(--color-medium-dark);
    transform: translate(-50%);
    width: 70%;
  }
`;

export default Title;
