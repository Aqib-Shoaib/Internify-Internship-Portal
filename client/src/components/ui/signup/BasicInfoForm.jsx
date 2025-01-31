/* eslint-disable react/prop-types */
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import styled from "styled-components";
import Googlebtn from "../../utils/Googlebtn";
import InputBox from "../../utils/InputBox";
import Button from "../../utils/FormBtn";

const StyledForm = styled.div`
  width: 100%;
  .form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 5px;
    margin: 5px;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }
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

const GoogleBox = styled.div`
  grid-column: 1/-1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function BasicInfoForm({ role, incrementFormNumber }) {
  const [value, setValue] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    incrementFormNumber();
  }

  return (
    <StyledForm>
      <form className='form' onSubmit={handleSubmit}>
        <InputBox>
          <label className='label'>
            {role === "COMPANY" ? "Company Name" : "Full Name"}
          </label>
          <input
            type='text'
            placeholder={role === "COMPANY" ? "Company Name" : "Full Name"}
            className='input'
          />
        </InputBox>
        <InputBox>
          <label className='label'>Email</label>
          <input
            type='email'
            placeholder='example@gmail.com'
            className='input'
          />
        </InputBox>
        <InputBox>
          <label className='label'>Phone Number</label>
          <PhoneInput
            placeholder='Enter phone number'
            value={value}
            onChange={setValue}
            defaultCountry='PK'
          />
        </InputBox>
        <InputBox>
          <label className='label'>Password</label>
          <input type='password' className='input' />
        </InputBox>
        <InputBox>
          <label className='label'>Password Confirm</label>
          <input type='password' className='input' />
        </InputBox>

        <InputBox>
          <label className='label'>
            {role === "COMPANY" ? "Website URL" : "Portfolio URL"}
            <span>(if any)</span>
          </label>
          <input type='url' placeholder='www.example.com' className='input' />
        </InputBox>

        <GoogleBox>
          <Break>
            <hr />
            <span>OR</span>
            <hr />
          </Break>
          <Googlebtn text='Sign up with Google' />
        </GoogleBox>

        <Button>
          <button className='button' type='submit'>
            Next
          </button>
        </Button>
      </form>
    </StyledForm>
  );
}

export default BasicInfoForm;
