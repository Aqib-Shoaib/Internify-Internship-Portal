import styled from "styled-components";

import InternshipNav from "../components/ui/internship/InternshipNav";
import FilterSidebar from "../components/ui/internship/FilterSidebar";
import Main from "../components/ui/internship/Main";

const StyledPage = styled.div`
  @media (min-width: 992px) {
    .layout {
      padding: 1.5rem;
      display: grid;
      grid-template-columns: 15vw 85vw;
    }
  }
`;

function InternshipsListingPage() {
  return (
    <StyledPage>
      <InternshipNav />

      <div className='layout'>
        <FilterSidebar />
        <Main />
      </div>
    </StyledPage>
  );
}

export default InternshipsListingPage;
