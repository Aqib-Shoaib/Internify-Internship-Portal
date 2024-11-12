import styled from "styled-components";

const StyledHero = styled.div`
  padding: 2rem 1rem;

  p {
    letter-spacing: 1px;
    font-size: var(--fs-subheading);
  }

  @media (min-width: 768px) {
    height: 100vh;
    display: grid;
    grid-template-columns: 45% 45%;
    place-items: center;
    gap: 7%;
    padding: 2rem;
  }
`;

const Title = styled.h2`
  font-size: 5rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 0.5rem 0;

  span {
    color: var(--color-contrast);
  }
`;

const Btn = styled.button`
  background: var(--color-contrast);
  padding: 1rem;
  border-radius: 999px;
  letter-spacing: 1px;
  font-size: var(--fs-subheading);
  color: var(--color-light);
  transform: translateY(0.5rem);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(0);
    filter: brightness(1.2);
  }
`;

const Image = styled.div`
  margin: 1rem 0;

  img {
    object-fit: cover;
  }
`;

function Hero() {
  return (
    <StyledHero>
      <div>
        <Title>
          Unlock Your Potential: <span>Top Internship </span>
          Opportunities
        </Title>
        <p>
          Bridging the gap between academia and industry, we connect talented
          students with top companies for transformative internship experiences.
        </p>
        <Btn>Get Started</Btn>
      </div>

      <Image>
        <img
          src="/internship-illustration.jpg"
          alt="vector illustration image for internship"
        />
      </Image>
    </StyledHero>
  );
}

export default Hero;
