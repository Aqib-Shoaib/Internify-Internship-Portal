/* eslint-disable react/prop-types */

import styled from "styled-components";
import Arraybox from "./Arraybox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faClock,
  faPaperPlane,
  faPlus,
  faThumbsDown,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";

const ProfilePic = styled.div`
  width: 20rem;
  height: 30rem;
  border-radius: 20px;
  border: 2px solid var(--color-medium-dark);
  padding: 0;
  margin: 0;

  .img {
    width: 100%;
    height: 100%;
  }
`;

const MainInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  justify-content: space-between;

  .user-type {
    font-size: var(--fs-small);
    margin: 0.5rem 0;
  }
  .col-span-2 {
    grid-column: 1/-1;
  }
  .flex-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .link {
    color: var(--color-contrast);
    font-size: var(--fs-small);
    font-weight: var(--fw-light);
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const MainBox = styled.main`
  display: grid;
  grid-template-columns: 20rem 1fr;
  gap: var(--space-lg);
  align-items: end;
  justify-content: left;
  margin: 2rem 0;
`;

const Experience = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: end;
  justify-content: start;

  .exp {
    padding: 2rem;
    border-radius: 10px;
    width: 40rem;
    background: var(--color-medium-dark);
    .expInfo {
      color: var(--color-light);
    }
  }
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem 0;
  }
  .company {
    font-size: var(--fs-body);
  }
  .location {
    font-size: var(--fs-small);
  }
  .role,
  .time {
    background: var(--color-medium-light);
    color: var(--color-dark);
    padding: 0.5rem;
    border-radius: 99px;
    width: fit-content;
  }
`;

const Certificates = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: end;
  justify-content: start;

  .certificates {
    width: 35rem;
    padding: 0.5rem;
    border: 1px solid var(--color-medium-light);
    border-radius: 5px;
    position: relative;
  }
  .image-container {
    width: 100%;
    height: 20rem;
    margin-bottom: 1rem;

    .img {
      height: 100%;
      width: 100%;
    }
  }
  .date {
    position: absolute;
    bottom: 3px;
    right: 3px;
    font-size: var(--fs-small);
    font-weight: var(--fw-medium);
  }
  .title {
    font-size: var(--fs-body);
    font-weight: var(--fw-medium);
    letter-spacing: 1px;
    text-transform: capitalize;
    color: var(--color-dark);
  }
  .org {
    font-size: var(--fs-body);
    font-weight: var(--fw-light);
    color: var(--color-medium-dark);
  }
`;

const Internships = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: end;
  justify-content: start;

  .internship {
    width: 33vw;
    padding: 0.5rem;
    border: 1px solid var(--color-medium-light);
    border-radius: 5px;
  }
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .status {
    font-size: var(--fs-small);
  }
  .icon {
    font-size: var(--fs-small);
    color: var(--color-medium-dark);
  }
  .heading {
    font-size: var(--fs-body);
    font-weight: var(--fw-bold);
    letter-spacing: 0.5px;
    color: var(--color-dark);
    text-transform: capitalize;
  }
`;

// const Reviews = styled.div`
//   display: flex;
//   gap: 1rem;
//   flex-wrap: wrap;
//   align-items: end;
//   justify-content: start;

// `;

const StyledInternPage = styled.section`
  padding: 2rem;

  .h2 {
    margin: 1rem 0;
    text-transform: capitalize;
  }
  .addBtn {
    border: 1px solid var(--color-medium-dark);
    padding: 2rem;
    border-radius: 10px;
    background: var(--color-medium-dark);
    transition: all 0.3s ease;

    &:hover {
      background: var(--color-medium-light);
    }
  }
  .addBtn2 {
    border: 1px solid var(--color-medium-dark);
    padding: 1rem;
    border-radius: 10px;
    background: var(--color-medium-dark);
    transition: all 0.3s ease;
    color: var(--color-medium-light);

    &:hover {
      color: var(--color-dark);
      background: var(--color-medium-light);
    }
  }
`;

function Intern({ user }) {
  const {
    profilePic,
    fullName,
    shortbio,
    email,
    user_type,
    phone,
    portfolioUrl,
    university,
    major,
    degree,
    currentYear,
    skills,
    interests,
    location,
    workExp,
    certificates,
    internships,
    reviews,
    jobPreferences,
  } = user;
  return (
    <StyledInternPage>
      <MainBox>
        <ProfilePic>
          <img className='img' src={profilePic} alt='user profile pic' />
        </ProfilePic>
        <MainInfo>
          <div>
            <h1>{fullName}</h1>
            <p className='user-type'>{user_type}</p>
          </div>
          <div>
            <p>{university}</p>
            <p>
              <span>{major}</span>
              <span> </span>
              <span>{degree}</span>
            </p>
            <p>{currentYear}</p>
          </div>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
          <div className='col-span-2 flex-column'>
            <p>{shortbio}</p>

            <a className='link' href={portfolioUrl}>
              {portfolioUrl}
            </a>
          </div>
        </MainInfo>
      </MainBox>

      <Arraybox list={skills} title='Skills' />
      <Arraybox list={interests} title='Internship Interest' />
      <Arraybox list={location} title='Internship Location preferences' />

      <div>
        <h2 className='h2'>Previous Experience</h2>
        <Experience>
          {workExp.map((exp, index) => (
            <div className='exp' key={index}>
              <div className='flex'>
                <p className='expInfo role'> {exp.role}</p>
                <p className='expInfo time'> {exp.time}</p>
              </div>
              <div className='flex'>
                <p className='expInfo company'> {exp.company}</p>
                <p className='expInfo location'> {exp.location}</p>
              </div>
              <p className='expInfo'> {exp.description}</p>
            </div>
          ))}
          <button type='button' className='addBtn'>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </Experience>
      </div>

      <div>
        <h2 className='h2'>Certificates</h2>
        <Certificates>
          {certificates.map((certificate, index) => (
            <div key={index} className='certificates'>
              <div className='image-container'>
                <img
                  className='img'
                  src={certificate.image}
                  alt='Certificates image'
                />
              </div>
              <p className='date'>{certificate.issueDate}</p>
              <p className='title'>{certificate.title}</p>
              <p className='org'>{certificate.issuingOrganization}</p>
            </div>
          ))}
          <button type='button' className='addBtn'>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </Certificates>
      </div>

      <div>
        <h2 className='h2'>Internship Track</h2>
        <Internships>
          {internships.map((internship, index) => (
            <div className='internship' key={index}>
              <p className='heading'>{internship.name}</p>
              <p>{internship.company}</p>

              <div className='flex'>
                <p className='status'>{internship.status.toUpperCase()}</p>

                {/* icon */}
                {internship.status.toLowerCase().replace(" ", "") ===
                "applied" ? (
                  <FontAwesomeIcon className='icon' icon={faPaperPlane} />
                ) : internship.status.toLowerCase().replace(" ", "") ===
                  "inProgress" ? (
                  <FontAwesomeIcon className='icon' icon={faClock} />
                ) : internship.status.toLowerCase().replace(" ", "") ===
                  "viewed" ? (
                  <FontAwesomeIcon className='icon' icon={faUserCheck} />
                ) : internship.status.toLowerCase().replace(" ", "") ===
                  "completed" ? (
                  <FontAwesomeIcon className='icon' icon={faCheckDouble} />
                ) : internship.status.toLowerCase().replace(" ", "") ===
                  "rejected" ? (
                  <FontAwesomeIcon className='icon' icon={faThumbsDown} />
                ) : (
                  <FontAwesomeIcon className='icon' icon={faPaperPlane} />
                )}
              </div>
            </div>
          ))}
          <button type='button' className='addBtn2'>
            <FontAwesomeIcon icon={faPlus} /> <span>Apply for more</span>
          </button>
        </Internships>
      </div>
      {jobPreferences.map((jobPreference, index) => (
        <p key={index}>internships: {jobPreference}</p>
      ))}
      {reviews.map((review, index) => (
        <p key={index}>internships: {review.rating}</p>
      ))}
    </StyledInternPage>
  );
}

export default Intern;
