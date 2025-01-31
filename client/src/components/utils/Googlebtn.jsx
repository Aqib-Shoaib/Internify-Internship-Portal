import styled from "styled-components";

const GoogleBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: var(--fs-small);
  padding: 0.7rem 1.25rem;
  border: none;
  border-radius: 999px;
  background: #fff;
  border: 2px solid var(--color-medium-dark);
  text-transform: capitalize;
  letter-spacing: 1px;
  color: var(--color-medium-dark);
  transition: all 0.3s ease;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);

  .googleIcon {
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    transform: scaleX(1.03);
  }
`;
// eslint-disable-next-line react/prop-types
function Googlebtn({ text }) {
  return (
    <GoogleBtn>
      <span className='googleIcon'>
        <img src='/google.png' alt='google logo' />
      </span>
      {text}
    </GoogleBtn>
  );
}

export default Googlebtn;
