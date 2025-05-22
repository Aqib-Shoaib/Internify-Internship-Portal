import InternshipNav from "../components/custom/page/internship/InternshipNav";
import FilterSidebar from "../components/custom/page/internship/FilterSidebar";
import Main from "../components/custom/page/internship/Main";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import Title from "@/components/custom/utils/Title";
import Sub from "@/components/custom/utils/Sub";

function InternshipsListingPage() {
  return (
    <div className=''>
      <Header />

      <div className='pt-24 md:pt-32  px-5 md:px-10'>
        <div className='py-3 flex flex-col gap-1.5'>
          <Title align='left'>Discover Quality Internships</Title>
          <Sub align='left'>
            We aim to connect talented & skillfull students with top-notch
            companies for a properly controlled industry experience
          </Sub>
        </div>
        <div className='flex flex-col md:flex-row items-start md:items-center justify-center gap-2.5 md:gap-5 py-1'>
          <InternshipNav />
          <FilterSidebar />
        </div>
        <Main />
      </div>

      <Footer />
    </div>
  );
}

export default InternshipsListingPage;
