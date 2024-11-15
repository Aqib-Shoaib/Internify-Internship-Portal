import styled from "styled-components";

const StyledHero = styled.div`
  padding: 2rem 1rem;
  width: 100%;

  background: linear-gradient(
    to bottom,
    var(--color-medium-dark),
    var(--color-light) 75%
  );

  p {
    letter-spacing: 1px;
    font-size: var(--fs-body);
  }

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: 45% 45%;
    place-items: center;
    gap: 7%;
    padding: 2rem 4rem;
  }
`;

const Title = styled.h2`
  font-size: var(--fs-heading);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 0.5rem 0;
  line-height: 1.5;

  span {
    color: var(--color-light);
  }
`;

const Btn = styled.button`
  background: var(--color-light);
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 999px;
  letter-spacing: 1px;
  color: var(--color-dark);
  transform: translateY(0.5rem);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(0);
    /* filter: brightness(1.1); */
    background: var(--color-medium-dark);
    color: var(--color-light);
  }
`;

const Image = styled.div`
  margin: 1rem 0;

  img {
    object-fit: cover;
    filter: sepia(50%);
  }
`;

function Hero() {
  return (
    <StyledHero>
      <div data-aos="fade-right">
        <Title>
          Unlock Your Potential: <span>Top Internships </span>
          Top Companies
        </Title>
        <p>
          Bridging the gap between academia and industry, we connect talented
          students with top companies for transformative internship experiences.
        </p>
        <Btn>Get Started</Btn>
      </div>

      <Image data-aos="fade-left">
        <img
          src="/internship-illustration.png"
          alt="vector illustration image for internship"
        />
      </Image>
    </StyledHero>
  );
}

export default Hero;
