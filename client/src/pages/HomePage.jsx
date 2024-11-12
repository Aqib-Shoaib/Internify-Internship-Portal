import Hero from "../components/ui/home/Hero";
import HowItWorks from "../components/ui/home/HowItWorks";
import InternshipListing from "../components/ui/internship/InternshipListing";

function HomePage() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <InternshipListing />
    </div>
  );
}

export default HomePage;
