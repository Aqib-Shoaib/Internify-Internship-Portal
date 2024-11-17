import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGopuram,
  faUser,
  faUserDoctor,
  faShareNodes,
  faFaceSmileBeam,
  faBullseye,
  faBuilding,
  faPlus,
  faCheckDouble,
  faClipboardQuestion,
  faUniversalAccess,
} from "@fortawesome/free-solid-svg-icons";
import Title from "../../utils/Title";
import Sub from "../../utils/Sub";

const Box = styled.div`
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 5px;
  background: #fff;
  h4 {
    font-size: var(--fs-subheading);
    font-weight: 300;
    text-transform: capitalize;
    color: var(--color-dark);
    display: inline-block;
    border-bottom: 1px solid var(--color-dark);
    padding: 5px;
    padding-bottom: 1px;
    letter-spacing: 1px;
    margin: 0.5rem 0;
  }
`;

const StyledWorkSection = styled.section`
  background: linear-gradient(to bottom, var(--color-light), #f0f8ff 85%);
  padding: 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  align-items: center;
  justify-content: center;
`;

const ListItem = styled.li`
  font-size: var(--fs-small);
  letter-spacing: 1px;
  margin: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  flex-wrap: wrap;
  b {
    text-transform: capitalize;
  }
  p {
    font-size: var(--fs-small);
  }

  div {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  span {
    color: var(--color-medium-dark);
    background: transparent;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Boxes = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1280px) {
    flex-direction: row;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function HowItWorks() {
  return (
    <StyledWorkSection>
      <TitleDiv>
        <Title>How It Works</Title>
        <Sub>Whether You&apos;re Seeking or Offering, We Connect the Dots.</Sub>
      </TitleDiv>
      <Boxes>
        <Box data-aos="zoom-in">
          <h4>If you want an Internship: </h4>
          <ul>
            <ListItem>
              <div>
                <span>
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <b>Create a Profile:</b>
              </div>
              <p>
                Showcase your skills, experience, and academic achievements.
              </p>
            </ListItem>
            <ListItem>
              <div>
                <span>
                  <FontAwesomeIcon icon={faGopuram} />
                </span>
                <b>Explore Opportunities:</b>
              </div>
              <p>Browse through a variety of internships from top companies.</p>
            </ListItem>
            <ListItem>
              <div>
                <span>
                  <FontAwesomeIcon icon={faUserDoctor} />{" "}
                </span>
                <b>Apply to Internships:</b>
              </div>
              <p>
                Submit your application and highlight your relevant
                qualifications.
              </p>
            </ListItem>
            <ListItem>
              <div>
                <span>
                  <FontAwesomeIcon icon={faShareNodes} />
                </span>
                <b>Connect with Recruiters:</b>
              </div>
              <p>Network with hiring managers and industry professionals.</p>
            </ListItem>
            <ListItem>
              <div>
                <span>
                  <FontAwesomeIcon icon={faFaceSmileBeam} />{" "}
                </span>
                <b>Ace the Interview:</b>
              </div>
              <p>Prepare for interviews and receive valuable career advice.</p>
            </ListItem>
            <ListItem>
              <div>
                <span>
                  <FontAwesomeIcon icon={faBullseye} />{" "}
                </span>
                <b>Land Your Dream Internship:</b>
              </div>
              <p>Secure a rewarding internship that aligns with your goals.</p>
            </ListItem>
          </ul>
        </Box>

        <Box data-aos="zoom-in">
          <h4>If you are looking for an Intern: </h4>
          <ul>
            <ListItem>
              <div>
                <span>
                  <FontAwesomeIcon icon={faBuilding} />
                </span>
                <b>Create a Company Profile:</b>
              </div>
              <p>Showcase your brand and attract top talent.</p>
            </ListItem>
            <ListItem>
              <div>
                <span>
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                <b>Post Internship Opportunities:</b>
              </div>
              <p>
                Create engaging internship listings and set clear expectations.
              </p>
            </ListItem>
            <ListItem>
              <div>
                <span>
                  <FontAwesomeIcon icon={faCheckDouble} />
                </span>
                <b>Review Applications:</b>
              </div>
              <p>Screen applications and identify promising candidates.</p>
            </ListItem>
            <ListItem>
              <div>
                <span>
                  <FontAwesomeIcon icon={faClipboardQuestion} />
                </span>
                <b>Conduct Interviews:</b>
              </div>
              <p>
                Assess candidates&apos; skills and cultural fit through
                interviews.
              </p>
            </ListItem>
            <ListItem>
              <div>
                <span>
                  <FontAwesomeIcon icon={faUniversalAccess} />{" "}
                </span>
                <b>Hire Top Talent:</b>
              </div>
              <p>
                Extend offers to qualified interns and build a strong talent
                pipeline.
              </p>
            </ListItem>
          </ul>
        </Box>
      </Boxes>
    </StyledWorkSection>
  );
}

export default HowItWorks;
