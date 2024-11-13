import styled from "styled-components";
import FeaturedInternships from "../components/ui/home/FeaturedInternships";
import Hero from "../components/ui/home/Hero";
import HowItWorks from "../components/ui/home/HowItWorks";

const StyledHome = styled.div`
  width: 100%;
  overflow: hidden;
`;

function HomePage() {
  return (
    <StyledHome>
      <Hero />
      <HowItWorks />
      <FeaturedInternships />
    </StyledHome>
  );
}

export default HomePage;
