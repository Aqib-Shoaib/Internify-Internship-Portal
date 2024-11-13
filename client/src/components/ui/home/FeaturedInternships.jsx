import styled from "styled-components";
import InternshipItem from "../../utils/InternshipItem";
import Sub from "../../utils/Sub";
import Title from "../../utils/Title";
import Slider from "react-slick";

const Internships = styled.div`
  width: 90%;
  .slider {
    border-radius: 50px;
  }
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  padding: 2rem 0.5rem;
  width: 100%;
  background-color: var(--color-light);
  background-color: #f0f8ff;
`;

function FeaturedInternships() {
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 700,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "50px",
    className: "slider",
    pauseOnDotsHover: true,
    slidesToShow: 3, // Default for larger screens

    responsive: [
      {
        breakpoint: 1600, // Extra-large screens
        settings: {
          slidesToShow: 3,
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 1300, // Laptops and larger tablets
        settings: {
          slidesToShow: 2,
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 992, // Tablets
        settings: {
          slidesToShow: 2,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 768, // Smaller tablets and large phones
        settings: {
          slidesToShow: 1,
          centerPadding: "60px",
        },
      },
      {
        breakpoint: 576, // Mobile devices
        settings: {
          slidesToShow: 1,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 420, // Very small mobile devices
        settings: {
          slidesToShow: 1,
          centerPadding: "10px",
        },
      },
    ],
  };

  const FAKE_DATA = [
    {
      date: "May 29,2024",
      company: "Amazon",
      image: "/amazon.png",
      title: "Senior Data Analyst",
      salary: "$260/month",
      location: "remote",
      bgColor: "#D4F6ED",
      keyPoints: [
        "Part Time",
        "Full Day",
        "Project Based",
        "Senior Level",
        "Flexible Schedule",
      ],
    },
    {
      date: "April 5, 2023",
      company: "Google",
      image: "/google.png",
      title: "Junior UI/UX Designer",
      salary: "$190/month",
      location: "California, CA",
      bgColor: "#E3DBFA",
      keyPoints: ["Part Time", "Project Based", "Junior Level"],
    },
    {
      date: "June 23, 2023",
      company: "Apple",
      image: "/apple.png",
      title: "Graphic Designer",
      salary: "$100/month",
      location: "San Francisco, CA",
      bgColor: "#FFE1CC",
      keyPoints: ["Part Time", "Practice Tasks"],
    },
    {
      date: "May 29,2024",
      company: "Amazon",
      image: "/amazon.png",
      title: "Senior Data Analyst",
      salary: "$260/month",
      location: "remote",
      bgColor: "#D4F6ED",
      keyPoints: [
        "Part Time",
        "Full Day",
        "Project Based",
        "Senior Level",
        "Flexible Schedule",
      ],
    },
    {
      date: "April 5, 2023",
      company: "Google",
      image: "/google.png",
      title: "Junior UI/UX Designer",
      salary: "$190/month",
      location: "California, CA",
      bgColor: "#E3DBFA",
      keyPoints: ["Part Time", "Project Based", "Junior Level"],
    },
    {
      date: "June 23, 2023",
      company: "Apple",
      image: "/apple.png",
      title: "Graphic Designer",
      salary: "$100/month",
      location: "San Francisco, CA",
      bgColor: "#FFE1CC",
      keyPoints: ["Part Time", "Practice Tasks"],
    },
  ];
  return (
    <StyledSection>
      <div>
        <Title>Featured Internships</Title>
        <Sub>Discover Your Next Big Step towards Success</Sub>
      </div>
      <Internships>
        <Slider {...settings}>
          {FAKE_DATA.map((item, ind) => (
            <InternshipItem key={ind} data={item} />
          ))}
        </Slider>
      </Internships>
    </StyledSection>
  );
}

export default FeaturedInternships;
