/* eslint-disable react/prop-types */

import styled from "styled-components";
import Arraybox from "./Arraybox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faClock,
  faPaperPlane,
  faPlus,
  faStar,
  faThumbsDown,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

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
  .preferences {
    display: flex;
    gap: 1rem;
    align-items: center;
    grid-column: 1/-1;
    span {
      font-size: var(--fs-body);
      font-weight: var(--fw-medium);
      color: var(--color-dark);
    }
    .items {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;

      .item {
        background: var(--color-medium-dark);
        color: var(--color-light);
        padding: 0.5rem 1.5rem;
        border-radius: 99px;
        font-size: var(--fs-small);
      }
    }
  }
`;

const MainBox = styled.main`
  display: grid;
  grid-template-columns: 20rem 1fr;
  gap: var(--space-lg);
  align-items: end;
  justify-content: left;
  background: #fff;
  margin-bottom: 1rem;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.11);
`;

const Experience = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: end;
  justify-content: start;
  background: #f7f7f7;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.11);

  .exp {
    padding: 1.5rem;
    border-radius: 10px;
    width: 40rem;
    background: #fff;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.11);
    .expInfo {
      color: var(--color-dark);
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
    background: var(--color-medium-dark);
    color: var(--color-light) !important;
    padding: 0.5rem 0.75rem;
    border-radius: 99px;
    font-size: var(--fs-small);
    width: fit-content;
  }
`;

const Certificates = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: end;
  justify-content: start;
  background: #f7f7f7;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.11);

  .certificates {
    background: #fff;
    padding: 0.5rem;
    border-radius: 5px;
    position: relative;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.11);
  }
  .image-container {
    width: 100%;
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
  background: #f7f7f7;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.11);

  .internship {
    padding: 0.5rem;
    border: 1px solid var(--color-medium-light);
    border-radius: 10px;
  }
  .flex {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    border-radius: 999px;
    padding: 0.25rem 1rem;
    width: fit-content;
    margin-top: 0.5rem;
  }
  .status {
    font-size: var(--fs-small);
  }
  .applied {
    background: #a594d840;
    border: 1px solid #a594d8;
    p,
    .icon {
      color: #a594d8;
    }
  }
  .inProgress {
    background: #7f66c040;
    border: 1px solid #7f66c0;
    p,
    .icon {
      color: #7f66c0;
    }
  }
  .rejected {
    background: #ff231140;
    border: 1px solid #ff2311;
    p,
    .icon {
      color: #ff2311;
    }
  }
  .completed {
    border: 1px solid #34c759;
    background: #34c75940;
    p,
    .icon {
      color: #34c759;
    }
  }
  .viewed {
    border: 1px solid #87ceeb;
    background: #87ceeb40;
    p,
    .icon {
      color: #87ceeb;
    }
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

const Reviews = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  flex-direction: column;
  background: #f7f7f7;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.11);

  .review {
    display: grid;
    grid-template-columns: 25% 1fr;
    align-items: center;
    background: #fff;
    justify-content: space-between;
    padding: 1rem;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    border-radius: 16px;
  }
  .reviewer {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
    .name {
      font-size: var(--fs-body);
      font-weight: var(--fw-bold);
      letter-spacing: 1px;
    }
  }
  .small {
    font-size: var(--fs-small);
    font-weight: var(--fw-regular);
    color: var(--color-medium-dark);
    letter-spacing: 1px;
  }
  .reviewContent {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .rating {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
  }
`;

const TabBtns = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem;
  padding-bottom: 0;
  border-bottom: 1px solid var(--color-medium-light);

  .btn {
    background: transparent;
    border: none;
    padding-bottom: 1rem;
    color: var(--color-medium-dark);
    transition: all 0.3 ease;
    font-size: var(--fs-body);

    &:hover {
      border-bottom: 2px solid var(--color-medium-dark);
      color: var(--color-dark);
    }
  }
  .active {
    border-bottom: 2px solid var(--color-medium-dark);
    color: var(--color-dark);
  }
`;

const StyledInternPage = styled.section`
  padding: 2rem;

  .h2 {
    margin: 1rem 0;
    text-transform: capitalize;
  }
  .tabheading {
    margin: 1rem 0;
    text-transform: capitalize;
    font-size: var(--fs-large);
  }
  .addBtn {
    padding: 1rem;
    border-radius: 999px;
    background: var(--color-medium-dark);
    transition: all 0.3s ease;
    color: var(--color-light);
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: var(--color-dark);
    }
  }
  .addBtn2 {
    padding: 0.5rem 1rem;
    border-radius: 999px;
    background: var(--color-medium-dark);
    transition: all 0.3s ease;
    color: var(--color-light);

    &:hover {
      background: var(--color-dark);
    }
  }
`;

function Intern({ user }) {
  const [tab, setTab] = useState("experience");
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
    internshipPreferences,
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
              Check out my Portfolio
            </a>
          </div>
          <div className='preferences'>
            <span>Internship preferences</span>
            <div className='items'>
              {internshipPreferences.map((internshipPreference, index) => (
                <p key={index} className='item'>
                  {internshipPreference}
                </p>
              ))}
            </div>
          </div>
        </MainInfo>
      </MainBox>

      <Arraybox list={skills} title='Skills' />
      <Arraybox list={interests} title='Internship Interest' />
      <Arraybox list={location} title='Internship Location preferences' />

      <TabBtns>
        <button
          className={`btn ${tab === "experience" && "active"}`}
          type='button'
          onClick={() => setTab("experience")}
        >
          Experience
        </button>
        <button
          className={`btn ${tab === "internships" && "active"}`}
          type='button'
          onClick={() => setTab("internships")}
        >
          Internships Track
        </button>
        <button
          className={`btn ${tab === "certificates" && "active"}`}
          type='button'
          onClick={() => setTab("certificates")}
        >
          Certificates
        </button>
        <button
          className={`btn ${tab === "reviews" && "active"}`}
          type='button'
          onClick={() => setTab("reviews")}
        >
          Reviews
        </button>
      </TabBtns>

      {tab === "experience" && (
        <div>
          <h2 className='tabheading'>Previous Experience</h2>
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
      )}
      {tab === "certificates" && (
        <div>
          <h2 className='tabheading'>Certificates</h2>
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
      )}

      {tab === "internships" && (
        <div>
          <h2 className='tabheading'>Internship Track</h2>
          <Internships>
            {internships.map((internship, index) => (
              <div className='internship' key={index}>
                <p className='heading'>{internship.name}</p>
                <p>{internship.company}</p>

                <div
                  className={`flex  ${
                    internship.status.toLowerCase().replace(" ", "") ===
                    "applied"
                      ? "applied"
                      : internship.status.toLowerCase().replace(" ", "") ===
                        "completed"
                      ? "completed"
                      : internship.status.toLowerCase().replace(" ", "") ===
                        "inProgress"
                      ? "inProgress"
                      : internship.status.toLowerCase().replace(" ", "") ===
                        "viewed"
                      ? "viewed"
                      : internship.status.toLowerCase().replace(" ", "") ===
                        "rejected"
                      ? "rejected"
                      : ""
                  } `}
                >
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
      )}
      {tab === "reviews" && (
        <div>
          <h2 className='tabheading'>Reviews & Feedbacks</h2>
          <Reviews>
            {reviews.map((review, index) => (
              <div key={index} className='review'>
                <div>
                  <p className='reviewer'>
                    <span className='name'>{review.reviewerName}</span>
                    <span className='small'>{review.reviewerJobTitle}</span>
                  </p>

                  <p className='small'>{review.date}</p>
                </div>
                <div className='reviewContent'>
                  <p className='rating'>
                    <span>{review.rating}</span>
                    <FontAwesomeIcon
                      icon={faStar}
                      size='sm'
                      style={{ color: "#FFD43B" }}
                    />
                  </p>
                  <p>{review.review}</p>
                </div>
              </div>
            ))}
          </Reviews>
        </div>
      )}
    </StyledInternPage>
  );
}

export default Intern;
