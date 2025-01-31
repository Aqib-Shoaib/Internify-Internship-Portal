import styled from "styled-components";
import InputBox from "../../utils/InputBox";
import Button from "../../utils/FormBtn";

const StyledForm = styled.div`
  padding: 10px;

  .form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 5px;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  .h2 {
    font-size: var(--fs-body);
    margin: 5px 0;
  }
  .textarea {
    grid-column: 1/-1;
  }
`;

function CompanyDetailForm() {
  return (
    <StyledForm>
      <h2 className='h2'>Company Details</h2>
      <form className='form'>
        <InputBox>
          <label className='label'>Industry / Sector</label>
          <input
            type='text'
            className='input'
            placeholder='Tech, Healthcare, Finance etc.'
          />
        </InputBox>
        <InputBox>
          <label className='label'>Head-Quarter Location</label>
          <input
            type='text'
            className='input'
            placeholder='ABC CITY, ROAD XYZ'
          />
        </InputBox>
        <InputBox className='textarea'>
          <label>Description</label>
          <textarea
            className='input'
            placeholder='brief description about your company'
          ></textarea>
        </InputBox>
        <InputBox>
          <label className='label'>Name of HR / Recruiter</label>
          <input type='text' className='input' placeholder='Recruiter name' />
        </InputBox>
        <InputBox>
          <label className='label'>Job Title of HR / Recruiter</label>
          <input type='text' className='input' placeholder='HR Manager' />
        </InputBox>
        <InputBox>
          <label className='label'>Company Registeration Number (if any)</label>
          <input
            type='number'
            placeholder='NTN / SECP number'
            className='input'
          />
        </InputBox>
        <Button>
          <button className='button' type='submit'>
            Signup
          </button>
        </Button>
      </form>
    </StyledForm>
  );
}

export default CompanyDetailForm;
