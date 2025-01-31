import { useState } from "react";
import InputBox from "../../utils/InputBox";
import KeywordsInput from "../../utils/KeywordsInput";
import Button from "../../utils/FormBtn";
import styled from "styled-components";

const StyledForm = styled.div`
  padding: 10px;
  width: 100%;

  .h2 {
    font-size: var(--fs-body);
    margin: 5px 0;
  }
  .form {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr;
    gap: 5px;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

function EducationDetailsForm() {
  const [skills, setSkills] = useState([]);
  const [interest, setInterest] = useState([]);
  const [locationPreference, setLocationPreference] = useState([]);

  const handleSkillsKeywordsChange = (keywords) => {
    setSkills(keywords);
  };
  const handleInterestKeywordsChange = (keywords) => {
    setInterest(keywords);
  };
  const handleLocationKeywordsChange = (keywords) => {
    setLocationPreference(keywords);
  };

  console.log(skills);
  console.log(interest);
  console.log(locationPreference);
  return (
    <StyledForm>
      <h2 className='h2'>Educational Details</h2>
      <form className='form'>
        <InputBox>
          <label className='label'>College / Univeristy</label>
          <input type='text' className='input' placeholder='UET Taxila' />
        </InputBox>
        <InputBox>
          <label className='label'>Major</label>
          <input type='text' placeholder='MS, BS etc' className='input' />
        </InputBox>
        <InputBox>
          <label className='label'>Degree</label>
          <input
            type='text'
            placeholder='Software Engineer'
            className='input'
          />
        </InputBox>
        <InputBox>
          <label className='label'>Current Year</label>
          <select className='input'>
            <option value='freshman'>Freshman(1st year)</option>
            <option value='sophomore'>Sophomore (2nd year)</option>
            <option value='junior'>Junior (3rd year)</option>
            <option value='senior'>Senior (4th year)</option>
            <option value='Graduate'>Graduate </option>
            <option value='postGraduate'>Post Graduate </option>
          </select>
        </InputBox>
        <InputBox>
          <label className='label'>What are your Internships Interests</label>
          <KeywordsInput
            onKeywordsChange={handleInterestKeywordsChange}
            placeholder='Web Developer, Designer etc'
          />
        </InputBox>
        <InputBox>
          <label className='label'>Add your skills</label>
          <KeywordsInput
            onKeywordsChange={handleSkillsKeywordsChange}
            placeholder='React Nodejs Photoshop etc.'
          />
        </InputBox>
        <InputBox>
          <label className='label'>Location Preference</label>
          <KeywordsInput
            onKeywordsChange={handleLocationKeywordsChange}
            placeholder='React Nodejs Photoshop etc.'
          />
        </InputBox>

        <Button>
          <button className='button'>Signup</button>
        </Button>
      </form>
    </StyledForm>
  );
}

export default EducationDetailsForm;
