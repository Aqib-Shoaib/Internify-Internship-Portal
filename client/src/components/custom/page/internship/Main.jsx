import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import InternshipItem from "./InternshipItem";
import { FAKE_DATA } from "@/dummy/Internships";

function Main() {
  return (
    <div className='px-2 md:px-4'>
      <div
        className='flex flex-col items-center justify-center gap-2 mb-6'
        data-aos='zoom-in'
      >
        <div className='flex items-center gap-2'>
          <h3 className='text-xl font-semibold'>Recommended Jobs</h3>
          <span className='border border-gray-700 rounded-full px-2 py-1 text-sm'>
            {FAKE_DATA.length}
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>Sort By</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Newest First</DropdownMenuItem>
            <DropdownMenuItem>Remote Only</DropdownMenuItem>
            <DropdownMenuItem>High Paying</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6 place-items-center w-full'>
        {FAKE_DATA.map((data) => (
          <InternshipItem key={data.title} data={data} />
        ))}
      </div>
    </div>
  );
}

export default Main;
