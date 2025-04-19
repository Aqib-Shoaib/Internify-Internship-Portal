import styled from "styled-components";
import CompanyHr from "../components/ui/profile/CompanyHr";
import Intern from "../components/ui/profile/Intern";
import { HR_USER } from "../dummy/user";
// import {  INTERN_USER } from "../dummy/user";

const StyledPage = styled.div`
  padding: 0 5%;
  background: linear-gradient(
    to top,
    var(--color-light) 30%,
    var(--color-medium-light)
  );

  @media (min-width: 440px) {
    padding: 0 15%;
  }
`;

function ProfilePage() {
  const user = HR_USER;
  // const user = INTERN_USER;

  return (
    <StyledPage>
      {user.user_type === "INTERN" ? (
        <Intern user={user} />
      ) : (
        <CompanyHr user={user} />
      )}
    </StyledPage>
  );
}

export default ProfilePage;
