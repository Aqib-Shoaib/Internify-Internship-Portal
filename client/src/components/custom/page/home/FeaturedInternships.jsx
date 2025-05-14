import Slider from "react-slick";
import InternshipItem from "../internship/InternshipItem";
import Sub from "../../utils/Sub";
import Title from "../../utils/Title";
import { FAKE_DATA } from "@/dummy/Internships";

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
