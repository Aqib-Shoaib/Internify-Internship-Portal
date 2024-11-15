import styled from "styled-components";

const StyledFooter = styled.footer`
  background: var(--color-medium-dark);
  display: flex;
  gap: 5rem;
  padding: 4rem;
`;

const LogoBox = styled.div`
  flex: 1;
  img {
    height: 70%;
  }
`;

const ContactBox = styled.div`
  flex: 2;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  span {
    color: var(--color-light);
  }
`;

const Links = styled.div`
  flex: 2;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  justify-content: flex-start;

  a {
    transition: all 0.3s ease-in-out;
  }
  a:hover {
    border-bottom: 1px solid var(--color-medium-light);
    color: var(--color-light);
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <LogoBox>
        <img src="logo.svg" alt="footer logo" />
      </LogoBox>

      <ContactBox>
        <div data-aos="fade-up">
          <h3>Mail: </h3>
          <span>aqibibnamjid@gmail.com</span>
        </div>
        <div data-aos="fade-up">
          <h3>Address: </h3>
          <span>UET Taxila</span>
        </div>
        <div data-aos="fade-up">
          <h3>Phone: </h3>
          <span>+92 304 6164841</span>
        </div>
      </ContactBox>

      <Links data-aos="fade-up">
        <a href="">About us</a>
        <a href="">Contact us</a>
        <a href="">Internships</a>
        <a href="">Interns</a>
        <a href="">News</a>
      </Links>
    </StyledFooter>
  );
}

export default Footer;
