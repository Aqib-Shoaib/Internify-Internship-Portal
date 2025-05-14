import Header from "@/layout/Header";
import FeaturedInternships from "../components/custom/page/home/FeaturedInternships";
import Hero from "../components/custom/page/home/Hero";
import HowItWorks from "../components/custom/page/home/HowItWorks";
import Footer from "@/layout/Footer";

function HomePage() {
  return (
    <div className='w-full overflow-hidden bg-background'>
      <Header />
      <Hero />
      <HowItWorks />
      <FeaturedInternships />
      <Footer />
    </div>
  );
}

export default HomePage;
