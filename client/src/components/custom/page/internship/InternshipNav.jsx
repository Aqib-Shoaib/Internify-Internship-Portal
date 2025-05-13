import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import RangeSelector from "../../utils/RangeSelector";

function InternshipNav() {
  return (
    <div className='flex flex-col md:flex-row md:flex-wrap items-center justify-evenly w-full bg-gradient-to-b from-[--color-sidebar] to-[--color-sidebar-primary] py-4 gap-4'>
      <div className='relative w-64'>
        <Search className='absolute left-2.5 top-2.5 text-muted-foreground w-4 h-4' />
        <Input
          type='text'
          placeholder='Search Internship...'
          className='pl-8 border-b border-[--color-border] bg-transparent text-[--color-sidebar-foreground]'
        />
      </div>

      <Separator
        orientation='vertical'
        className='hidden md:inline-block h-8 bg-[--color-border]'
      />

      <Input
        type='text'
        placeholder='Location'
        className='w-64 border-b border-[--color-border] bg-transparent text-[--color-sidebar-foreground]'
      />

      <Separator
        orientation='vertical'
        className='hidden md:inline-block h-8 bg-[--color-border]'
      />

      <div className='flex items-center gap-3 w-72 text-sm text-[--color-sidebar-foreground]'>
        <span>Salary Range</span>
        <RangeSelector min={10} max={35} cname='flex gap-2' />
      </div>
    </div>
  );
}

export default InternshipNav;
