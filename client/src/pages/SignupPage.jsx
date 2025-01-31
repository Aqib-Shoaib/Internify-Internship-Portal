import { useState } from "react";
import { Link } from "react-router-dom";
import BasicInfoForm from "../components/ui/signup/BasicInfoForm";
import Role from "../components/ui/signup/Role";
import styled from "styled-components";
import CompanyDetailForm from "../components/ui/signup/CompanyDetailForm";
import EducationDetailsForm from "../components/ui/signup/EducationDetailsForm";

const StyledSignupPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
    35deg,
    var(--color-medium-light),
    var(--color-light)
  );
  .main {
    padding: var(--space-md);
    display: flex;
    align-items: center;
    border-radius: 20px;
    justify-content: center;
    flex-direction: column;
    width: 100%;

    background: linear-gradient(
      225deg,
      var(--color-medium-light),
      var(--color-light)
    );

    @media (min-width: 768px) {
      border: 1px solid var(--color-medium-light);
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
      max-width: 80%;
    }

    @media (min-width: 992px) {
      max-width: 60%;
    }
  }
  .h2 {
    margin: 5px 0;
  }
  .login {
    text-align: center;
    margin: 5px 0;
  }
`;

// form numbers
const MIN_FORM_NUMBER = 1;
const MAX_FORM_NUMBER = 2;

function SignupPage() {
  const [role, setRole] = useState("");
  const [formNumber, setFormNumber] = useState(MIN_FORM_NUMBER);

  return (
    <StyledSignupPage>
      <div className='main' data-aos='zoom-in'>
        <h2 className='h2'>Sign up now!</h2>
        {formNumber === MIN_FORM_NUMBER && (
          <>
            <Role setUserRole={(v) => setRole(v)} role={role} />
            <BasicInfoForm
              role={role}
              incrementFormNumber={() => setFormNumber(2)}
            />
          </>
        )}
        {formNumber === MAX_FORM_NUMBER && (
          <>
            {role === "COMPANY" ? (
              <CompanyDetailForm />
            ) : (
              <EducationDetailsForm />
            )}
          </>
        )}
        <div className='login'>
          <p>
            Already have an account? <Link to='/login'>Login</Link>{" "}
          </p>
        </div>
      </div>
    </StyledSignupPage>
  );
}

export default SignupPage;
