import Slider from "react-slick";
import InternshipItem from "../internship/InternshipItem";
import Sub from "../../utils/Sub";
import Title from "../../utils/Title";

function FeaturedInternships() {
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    speed: 700,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    className: "slider",
    pauseOnDotsHover: true,
    slidesToShow: 3,

    responsive: [
      { breakpoint: 1600, settings: { slidesToShow: 3 } },
      { breakpoint: 1300, settings: { slidesToShow: 2 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
      { breakpoint: 420, settings: { slidesToShow: 1 } },
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
    // Duplicated items for carousel length
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
    <section className='w-full flex flex-col items-center justify-center gap-16 bg-[#f0f8ff] px-4 py-12 md:px-8'>
      <div className='text-center'>
        <Title>Featured Internships</Title>
        <Sub>Discover Your Next Big Step towards Success</Sub>
      </div>

      <div className='w-[90%] rounded-[50px]'>
        <Slider {...settings}>
          {FAKE_DATA.map((item, index) => (
            <InternshipItem key={index} data={item} />
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default FeaturedInternships;
