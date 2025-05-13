import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function Filter() {
  return (
    <section className='flex flex-col gap-8 items-start w-fit'>
      <h3 className='text-base font-semibold'>Filters</h3>

      {/* Working schedule */}
      <div className='flex flex-col gap-4 items-start'>
        <span className='text-muted-foreground text-sm'>Working Schedule</span>

        <div className='flex items-center gap-2'>
          <Checkbox id='full' />
          <Label htmlFor='full' className='text-sm'>
            Full Time
          </Label>
        </div>

        <div className='flex items-center gap-2'>
          <Checkbox id='part' />
          <Label htmlFor='part' className='text-sm'>
            Part Time
          </Label>
        </div>
      </div>
    </section>
  );
}
