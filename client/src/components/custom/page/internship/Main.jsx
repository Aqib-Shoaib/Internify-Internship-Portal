import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import InternshipItem from "./InternshipItem";

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
  // You can keep or trim duplicates as needed
];

function Main() {
  return (
    <div className='px-4'>
      <div className='flex flex-col items-center justify-center gap-2 mb-6'>
        <div className='flex items-center gap-2'>
          <h3 className='text-xl font-semibold'>Recommended Jobs</h3>
          <span className='border border-gray-700 rounded-full px-2 py-1 text-sm'>
            {FAKE_DATA.length}
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>Sort By</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Newest First</DropdownMenuItem>
            <DropdownMenuItem>Remote Only</DropdownMenuItem>
            <DropdownMenuItem>High Paying</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 place-items-center'>
        {FAKE_DATA.map((data) => (
          <InternshipItem key={data.title} data={data} />
        ))}
      </div>
    </div>
  );
}

export default Main;
