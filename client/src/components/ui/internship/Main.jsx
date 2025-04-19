import styled from "styled-components";
import CustomDropdown from "../../utils/CustomDropdown";
import InternshipItem from "./InternshipItem";

const StyledMain = styled.div`
  .head {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .div {
      display: flex;
      gap: 5px;
      align-items: center;
      .span {
        border-radius: 50%;
        border: 1px solid var(--color-dark);
        padding: 5px;
      }
    }
  }
`;

const Listing = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 5rem;
  place-items: center;
  padding: 0 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: auto auto;
    gap: 1.5rem;
  }
  @media (min-width: 1366px) {
    grid-template-columns: auto auto auto;
    gap: 1.5rem;
  }
`;

const FAKE_DATA = [
  {
    date: "May 29,2024",
    company: "Amazon",
    image: "/amazon.png",
    title: "Senior Data Analyst",
    salary: "$260/month",
    location: "remote",
    bgColor: "#D4F6ED",
    // bgColor: "#aad8cc",
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

function Main() {
  return (
    <StyledMain>
      <div className='head'>
        <div className='div'>
          <h3>Recommended Jobs</h3>
          <span className='span'>{FAKE_DATA.length}</span>
        </div>
        <CustomDropdown />
      </div>
      <Listing>
        {FAKE_DATA.map((data) => (
          <InternshipItem key={data.title} data={data} />
        ))}
      </Listing>
    </StyledMain>
  );
}

export default Main;
