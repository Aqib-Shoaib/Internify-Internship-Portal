import { useState } from "react";
import { Link } from "react-router-dom";
import BasicInfoForm from "../components/custom/page/signup/BasicInfoForm";
import Role from "../components/custom/page/signup/Role";
import CompanyDetailForm from "../components/custom/page/signup/CompanyDetailForm";
import EducationDetailsForm from "../components/custom/page/signup/EducationDetailsForm";
import Title from "@/components/custom/utils/Title";
import toast from "react-hot-toast";

// form numbers
const MIN_FORM_NUMBER = 1;
const MAX_FORM_NUMBER = 2;
const FINAL_ROLE_ERROR = "This can't be changed Later";
const ROLE_ERROR = "Please select your role";

function SignupPage() {
  const [role, setRole] = useState("");
  const [roleErr, setRoleErr] = useState(ROLE_ERROR);
  const [formNumber, setFormNumber] = useState(MIN_FORM_NUMBER);
  const [basicData, setbasicData] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  function handleRole(role) {
    setRole(role);
    setbasicData((prev) => ({ ...prev, role }));
    setRoleErr(FINAL_ROLE_ERROR);
  }

  function handleBasicFormSubmit(e) {
    e.preventDefault();
    if (roleErr === FINAL_ROLE_ERROR) {
      setFormNumber(2);
    } else {
      toast.error("Role not selected", {
        duration: 3000,
      });
    }
  }

  return (
    <div className='flex items-center justify-center h-dvh w-dvw'>
      <div
        className='p-5 rounded-3xl w-full max-w-full md:max-w-3/5 shadow-2xl overflow-y-scroll h-screen md:h-[90vh] custom-scrollbar'
        data-aos='zoom-in'
      >
        <div>
          <Title>Sign Up</Title>
        </div>
        {formNumber === MIN_FORM_NUMBER && (
          <div className='flex flex-col gap-2 mt-6 mb-3'>
            <Role
              setUserRole={(v) => handleRole(v)}
              role={role}
              roleErr={roleErr}
            />
            <BasicInfoForm
              role={role}
              handleFormSubmit={handleBasicFormSubmit}
              basicData={basicData}
              setbasicData={setbasicData}
            />
          </div>
        )}
        {formNumber === MAX_FORM_NUMBER && (
          <div>
            {role === "COMPANY" ? (
              <CompanyDetailForm basicData={basicData} />
            ) : (
              <EducationDetailsForm basicData={basicData} />
            )}
          </div>
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
