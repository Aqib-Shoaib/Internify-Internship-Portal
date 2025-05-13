import InternshipNav from "../components/custom/page/internship/InternshipNav";
import FilterSidebar from "../components/custom/page/internship/FilterSidebar";
import Main from "../components/custom/page/internship/Main";

function InternshipsListingPage() {
  return (
    <div className='md:p-3.5 grid grid-cols-[15vw_85vw]'>
      <InternshipNav />

      <div className='layout'>
        <FilterSidebar />
        <Main />
      </div>
    </div>
  );
}

export default InternshipsListingPage;
