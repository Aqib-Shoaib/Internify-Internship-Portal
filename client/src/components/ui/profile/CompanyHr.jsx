import { faLock, faLockOpen, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";

const StyledCompanyHr = styled.div`
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
  .sm {
    font-size: var(--fs-small);
    font-weight: var(--fw-regular);
    letter-spacing: 1px;
    text-transform: uppercase;
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
  .bg {
    background: #fff;
    margin-bottom: 1rem;
    border-radius: 16px;
    padding: 1rem;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.11);
  }
`;

const IntroBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  background: #fff;
  margin-bottom: 1rem;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.11);

  .internCount {
    display: flex;
    font-size: var(--fs-body);
    font-weight: var(--fw-light);
  }
  .imageContainer {
    border-radius: 999px;
    margin: 0;
    max-width: 10rem;

    .img {
      border-radius: 999px;
      width: 100%;
      height: 100%;
    }
  }
`;

const ContactBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #fff;
  margin-bottom: 1rem;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.11);
`;

const InternshipsPosted = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: #f7f7f7;
  margin-bottom: 1rem;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.11);

  .internship {
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    display: grid;
    grid-template-columns: 25% 1fr;
  }
  .internshipbox {
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
  .status {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 1rem 0;
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

const ReviewBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: #f7f7f7;
  margin-bottom: 1rem;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.11);

  .review {
    display: grid;
    grid-template-columns: 25% 1fr;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0.5rem;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
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
  .box {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
  }
`;

/* eslint-disable react/prop-types */
function CompanyHr({ user }) {
  const [tab, setTab] = useState("reviews");
  return (
    <StyledCompanyHr>
      <IntroBox>
        <div className='imageContainer'>
          <img src={user.logo} className='img' alt='company logo' />
        </div>
        <div>
          <div>
            <p>{user.companyName}</p>
            <p className='sm'>
              <span>{user.user_type}</span>-<span>{user.industry}</span>
            </p>
            {/* <p className='sm'>{user.resgisterationNumber}</p> */}
          </div>
          <div className='internCount'>
            <span>Intern Count:</span>
            <p>{user.internCount}</p>
          </div>
          <div>
            <p>{user.headQuartersLocation}</p>
            <p>{user.briefDescription}</p>
          </div>
        </div>
      </IntroBox>
      <div>
        <div className='bg'>
          <h2 className='h2'>Our Company&apos;s Culture</h2>
          <p>{user.companyCulture}</p>
        </div>
        <div className='bg'>
          <h2 className='h2'>Our Mission</h2>
          <p>{user.mission}</p>
        </div>
      </div>
      <ContactBox>
        <h2 className='h2'>Contact Info</h2>
        <p>{user.recruiterName}</p>
        <p>{user.recruiterJobTitle}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <a href={user.websiteUrl} className='link'>
          Visit Our website
        </a>
      </ContactBox>
      <TabBtns>
        <button
          type='button'
          className={`btn ${tab === "internships" && "active"}`}
          onClick={() => setTab("internships")}
        >
          Internships Posted
        </button>
        <button
          type='button'
          className={`btn ${tab === "reviews" && "active"}`}
          onClick={() => setTab("reviews")}
        >
          Feedbacks & Reviews
        </button>
      </TabBtns>
      {tab === "internships" && (
        <div>
          <h2 className='tabheading'>Internships Posted</h2>
          <InternshipsPosted>
            {user.internshipsPosted.map((internship, index) => (
              <div key={index} className='internship'>
                <div className='internshipbox'>
                  <p className='name'>{internship.name}</p>
                  <p className='small'>
                    <span>{internship.location}</span>--
                    <span>{internship.type}</span>
                  </p>
                </div>
                <div>
                  <p>{internship.description}</p>
                  <p className='status'>
                    <span>{internship.status}</span>
                    {internship.status.toLowerCase() === "closed" ? (
                      <FontAwesomeIcon icon={faLock} />
                    ) : (
                      <FontAwesomeIcon icon={faLockOpen} />
                    )}
                  </p>
                </div>
              </div>
            ))}
          </InternshipsPosted>
        </div>
      )}
      {tab === "reviews" && (
        <div>
          <h2 className='tabheading'>Feedbacks & Reviews</h2>
          <ReviewBox>
            {user.reviews.map((review, index) => (
              <div key={index} className='review'>
                <div className='reviewer'>
                  <p className='name'>{review.intern}</p>
                  <p className='small'>{review.internJobTitle}</p>
                </div>
                <div className='reviewContent'>
                  <p>{review.review}</p>
                  <div className='box'>
                    <p className='rating'>
                      <span>{review.rating}</span>
                      <FontAwesomeIcon
                        icon={faStar}
                        size='sm'
                        style={{ color: "#FFD43B" }}
                      />
                    </p>
                    <span className='small'>{review.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </ReviewBox>
        </div>
      )}
    </StyledCompanyHr>
  );
}

export default CompanyHr;
