import { useState } from "react";
import { Link } from "react-router-dom";
import BasicInfoForm from "../components/custom/page/signup/BasicInfoForm";
import Role from "../components/custom/page/signup/Role";
import CompanyDetailForm from "../components/custom/page/signup/CompanyDetailForm";
import EducationDetailsForm from "../components/custom/page/signup/EducationDetailsForm";

// form numbers
const MIN_FORM_NUMBER = 1;
const MAX_FORM_NUMBER = 2;

function SignupPage() {
  const [role, setRole] = useState("");
  const [formNumber, setFormNumber] = useState(MIN_FORM_NUMBER);

  return (
    <div className='flex items-center justify-center h-dvh w-dvw'>
      <div
        className='p-5 flex items-center rounded-3xl justify-center flex-col w-full max-w-full md:max-w-3/5'
        data-aos='zoom-in'
      >
        <h2 className='m-1'>Sign up now!</h2>
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
        <div className='text-center my-1 text-sm uppercase p-2'>
          <p>
            Already have an account?{" "}
            <Link className='underline' to='/login'>
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
