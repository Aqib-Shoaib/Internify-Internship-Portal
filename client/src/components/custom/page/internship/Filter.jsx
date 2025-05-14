import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function Filter() {
  return (
    <section className='flex flex-col gap-8 items-start w-fit'>
      {/* Working schedule */}
      <div className='flex gap-4 items-start'>
        <div className='flex items-center gap-2'>
          <Checkbox id='full' className='cursor-pointer' />
          <Label
            htmlFor='full'
            className='text-base whitespace-nowrap font-medium'
          >
            Full Time
          </Label>
        </div>

        <div className='flex items-center gap-2'>
          <Checkbox id='part' className='cursor-pointer' />
          <Label
            htmlFor='part'
            className='text-base whitespace-nowrap font-medium'
          >
            Part Time
          </Label>
        </div>
      </div>
    </section>
  );
}
