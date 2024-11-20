import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    35deg,
    var(--color-medium-light),
    var(--color-light)
  );

  @media (min-width: 992px) {
    flex-direction: row;
  }
`;

const Main = styled.main`
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  padding: 4rem 5rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 1.25rem;
  flex-direction: column;
  border-radius: 10px;
  width: fit-content;
  height: fit-content;

  background: linear-gradient(
    225deg,
    var(--color-medium-light),
    var(--color-light)
  );
`;
const Break = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;
  hr {
    width: 100%;
    background: var(--color-dark);
    height: 3px;
    border-radius: 5px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  .input {
    padding: 1rem;
    border-radius: 0.5rem;
    border: none;
    outline: none;
    font-size: var(--fs-body);
    letter-spacing: 1px;
  }

  .btn {
    background: linear-gradient(
      to top left,
      var(--color-dark),
      var(--color-medium-dark)
    );
    box-shadow: 0px 4px 4px var(--color-medium-dark);
    border: none;
    border-radius: 999px;
    letter-spacing: 1px;
    padding: 1rem 2rem;
    color: var(--color-light);

    &:hover {
      filter: brightness(1.8);
      letter-spacing: 1.25px;
    }
  }
`;

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

const ImageDiv = styled.div`
  width: 50%;

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const Greeting = styled.div`
  display: none;

  @media (min-width: 992px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 1rem;
    width: 50%;
  }
`;

function Loginpage() {
  const navigate = useNavigate();

  return (
    <StyledLogin>
      <Greeting>
        <ImageDiv>
          <img src="/logo.svg" alt="internify logo" />
        </ImageDiv>
        <p>
          We Help You to Connect with companies in a bit more efficient and
          hurdle less way
        </p>
      </Greeting>
      <Main>
        <ImageDiv>
          <img src="/logo.svg" alt="internify logo" />
        </ImageDiv>

        <div>
          <h1>Welcome Back!</h1>
        </div>

        <Form>
          <input type="email" className="input" placeholder="Your Email..." />
          <input type="password" className="input" placeholder="Password" />
          <button className="btn" onClick={() => navigate("/")}>
            Login
          </button>
        </Form>

        <Break>
          <hr />
          <span>OR</span>
          <hr />
        </Break>

        <div>
          <GoogleBtn onClick={() => navigate("/")}>
            <span className="googleIcon">
              <img src="/google.png" alt="google logo" />
            </span>
            login with google
          </GoogleBtn>
        </div>
      </Main>
    </StyledLogin>
  );
}

export default Loginpage;
