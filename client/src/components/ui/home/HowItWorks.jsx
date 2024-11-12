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

const Title = styled.h3`
  font-weight: var(--fw-bold);
  font-size: 4rem;
  text-align: center;
  margin: 0.5rem 0;
`;

const Sub = styled.p`
  text-align: center;
  font-size: var(--fs-subheading);
  margin: 0.5rem 0;
`;

const Box = styled.div`
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 5px;
  background: #fff;
  h4 {
    font-size: 2.75rem;
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
  background: whitesmoke;
  padding: 3rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ListItem = styled.li`
  font-size: var(--fs-body);
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
  margin-top: 5rem;

  @media (min-width: 1280px) {
    flex-direction: row;
  }
`;

function HowItWorks() {
  return (
    <StyledWorkSection>
      <div>
        <Title>How It Works</Title>
        <Sub>Whether You&apos;re Seeking or Offering, We Connect the Dots.</Sub>
      </div>
      <Boxes>
        <Box>
          <h4>If you want an Internship: </h4>
          <ul>
            <ListItem>
              <div>
                <span>
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <b>Create a Profile:</b>
              </div>
              Showcase your skills, experience, and academic achievements.
            </ListItem>
            <ListItem>
              <div>
                <span>
                  <FontAwesomeIcon icon={faGopuram} />
                </span>
                <b>Explore Opportunities:</b>
              </div>
              Browse through a variety of internships from top companies.
            </ListItem>
            <ListItem>
              <div>
                <span>
                  <FontAwesomeIcon icon={faUserDoctor} />{" "}
                </span>
                <b>Apply to Internships:</b>
              </div>
              Submit your application and highlight your relevant
              qualifications.
            </ListItem>
            <ListItem>
              <div>
                <span>
                  <FontAwesomeIcon icon={faShareNodes} />
                </span>
                <b>Connect with Recruiters:</b>
              </div>
              Network with hiring managers and industry professionals.
            </ListItem>
            <ListItem>
              <div>
                <span>
                  <FontAwesomeIcon icon={faFaceSmileBeam} />{" "}
                </span>
                <b>Ace the Interview:</b> Prepare for interviews and receive
              </div>
              valuable career advice.
            </ListItem>
            <ListItem>
              <div>
                <span>
                  <FontAwesomeIcon icon={faBullseye} />{" "}
                </span>
                <b>Land Your Dream Internship:</b>
              </div>
              Secure a rewarding internship that aligns with your goals.
            </ListItem>
          </ul>
        </Box>

        <Box>
          <h4>If you are looking for an Intern: </h4>
          <ul>
            <ListItem>
              <div>
                <span>
                  <FontAwesomeIcon icon={faBuilding} />
                </span>
                <b>Create a Company Profile:</b>
              </div>
              Showcase your brand and attract top talent.
            </ListItem>
            <ListItem>
              <div>
                <span>
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                <b>Post Internship Opportunities:</b>
              </div>
              Create engaging internship listings and set clear expectations.
            </ListItem>
            <ListItem>
              <div>
                <span>
                  <FontAwesomeIcon icon={faCheckDouble} />
                </span>
                <b>Review Applications:</b>
              </div>
              Screen applications and identify promising candidates.
            </ListItem>
            <ListItem>
              <div>
                <span>
                  <FontAwesomeIcon icon={faClipboardQuestion} />
                </span>
                <b>Conduct Interviews:</b>
              </div>
              Assess candidates&apos; skills and cultural fit through
              interviews.
            </ListItem>
            <ListItem>
              <div>
                <span>
                  <FontAwesomeIcon icon={faUniversalAccess} />{" "}
                </span>
                <b>Hire Top Talent:</b>
              </div>
              Extend offers to qualified interns and build a strong talent
              pipeline.
            </ListItem>
          </ul>
        </Box>
      </Boxes>
    </StyledWorkSection>
  );
}

export default HowItWorks;
