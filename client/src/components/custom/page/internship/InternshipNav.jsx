import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import RangeSelector from "../../utils/RangeSelector";

function InternshipNav() {
  return (
    <div className='flex flex-col md:flex-row items-start md:items-center justify-between bg-transparent w-full py-4 gap-2.5 md:gap-5'>
      <div className='relative w-full'>
        <Search className='text-secondary w-4 h-4 absolute left-1.5 top-1/2 -translate-y-1/2 text-base' />
        <Input
          type='text'
          placeholder='Search Internship...'
          className='pl-8 border border-border bg-transparent text-secondary text-base font-medium w-full'
        />
      </div>

      <Input
        type='text'
        placeholder='Location'
        className='w-full border-b border-border bg-transparent text-secondary font-medium'
      />

      <div className='flex items-center gap-3 w-72 text-sm text-secondary'>
        <span className='whitespace-nowrap  font-medium'>Salary Range</span>
        <RangeSelector min={10} max={35} cname='flex gap-2' />
      </div>
    </div>
  );
}

export default InternshipNav;
