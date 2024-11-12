import { faCircleCheck, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";

const StyledItem = styled.div`
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  padding: 15px;
  width: 380px;
  height: 420px;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Main = styled.main`
  background: ${($props) => $props.bg || "#bcf505"};
  border-radius: 25px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DateBox = styled.div`
  font-family: var(--font-decorative);
  font-size: var(--fs-body);
  font-weight: var(--fw-medium);
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.5rem;

  span {
    background: #fff;
    padding: 10px;
    border-radius: 999px;
  }
  .icon {
    cursor: pointer;
  }
`;

const Companylogo = styled.img`
  width: 50px;
  border-radius: 50%;
`;

const Companybox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.5rem;
`;

const PointsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;

  span {
    border: 0.5px solid var(--color-dark);
    padding: 5px;
    border-radius: 999px;
  }
`;

const DetailsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .location {
    font-weight: var(--fw-bold);
  }

  button {
    background: var(--button-primary-bg);
    color: var(--button-primary-text);
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
