import { faCircleCheck, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";

const StyledItem = styled.div`
  border-radius: 2.5rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.7rem;
  width: 28rem;
  height: 38rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s linear;

  @media (min-width: 430px) {
    width: 32rem;
    height: 43rem;
  }

  @media (min-width: 992px) {
    width: 31rem;
    height: 34rem;
  }

  &:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  }
`;

const Main = styled.main`
  background: ${($props) => $props.bg || "#bcf505"};
  border-radius: 2.5rem;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
`;

const DateBox = styled.div`
  font-family: var(--font-decorative);
  font-size: var(--fs-small);
  font-weight: var(--fw-regular);
  letter-spacing: 1px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  justify-content: flex-start;

  span {
    background: #fff;
    padding: 1rem;
    border-radius: 999px;
  }
  .icon {
    cursor: pointer;
  }
  @media (min-width: 430px) {
    flex-direction: row;
    align-items: center;

    justify-content: space-between;
    padding: 1rem 0.5rem;
  }
`;

const Companylogo = styled.img`
  width: 5rem;
  border-radius: 50%;
  margin: 0.5rem;
`;

const Companybox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  font-size: var(--fs-body);

  @media (min-width: 430px) {
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const PointsBox = styled.div`
  display: none;

  @media (min-width: 430px) {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    justify-content: flex-start;
    padding: 0.5rem;

    span {
      /* border: 0.5px solid var(--color-dark); */
      padding: 5px;
      font-size: var(--fs-small);
      border-radius: 999px;
      box-shadow: 0 0 8px rgb(0, 0, 0, 0.3);
    }
  }
`;

const DetailsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .location {
    font-weight: var(--fw-bold);
    font-size: var(--fs-body);
  }
  .salary {
    font-size: var(--fs-body);
  }

  button {
    background: var(--button-primary-bg);
    color: var(--button-primary-text);
    font-size: var(--fs-body);
    padding: 10px;
    border-radius: 999px;
    text-transform: capitalize;
  }
`;

/* eslint-disable react/prop-types */
function InternshipItem({ data }) {
  const [liked, setLiked] = useState(false);
  return (
    <StyledItem>
      <Main bg={data.bgColor}>
        {/* date + save icon */}
        <DateBox>
          <span>{data.date}</span>
          {liked ? (
            <span className="icon" onClick={() => setLiked(false)}>
              <FontAwesomeIcon icon={faHeart} />
            </span>
          ) : (
            <span className="icon" onClick={() => setLiked(true)}>
              <FontAwesomeIcon icon={faCircleCheck} />
            </span>
          )}
        </DateBox>

        {/* company + title */}
        <Companybox>
          <div>
            <span>{data.company}</span>
            <h3>{data.title}</h3>
          </div>
          <div>
            <Companylogo src={data.image} alt="company logo" />
          </div>
        </Companybox>

        {/* key points */}
        <PointsBox>
          {data.keyPoints.map((val, i) => (
            <span key={i}>{val}</span>
          ))}
        </PointsBox>
      </Main>

      {/* location + salary */}
      <DetailsBox>
        <div>
          <p className="salary">{data.salary}</p>
          <p className="location">{data.location}</p>
        </div>
        <button>details</button>
      </DetailsBox>
    </StyledItem>
  );
}

export default InternshipItem;
