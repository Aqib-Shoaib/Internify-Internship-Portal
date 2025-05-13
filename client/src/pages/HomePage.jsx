import FeaturedInternships from "../components/custom/page/home/FeaturedInternships";
import Hero from "../components/custom/page/home/Hero";
import HowItWorks from "../components/custom/page/home/HowItWorks";

function HomePage() {
  return (
    <div className='w-full overflow-hidden'>
      <Hero />
      <HowItWorks />
      <FeaturedInternships />
    </div>
  );
}

export default HomePage;
