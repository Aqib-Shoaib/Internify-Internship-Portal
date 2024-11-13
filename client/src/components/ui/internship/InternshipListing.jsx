import styled from "styled-components";
import InternshipItem from "../../utils/InternshipItem";

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function InternshipListing() {
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
  ];

  return (
    <Flex>
      <InternshipItem data={FAKE_DATA[0]} />
      <InternshipItem data={FAKE_DATA[1]} />
      <InternshipItem data={FAKE_DATA[2]} />
    </Flex>
  );
}

export default InternshipListing;
