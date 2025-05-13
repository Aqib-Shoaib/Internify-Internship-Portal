import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function CompanyDetailForm() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className='w-full p-4'>
      <h2 className='text-base font-semibold mb-3'>Company Details</h2>

      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 md:grid-cols-2 gap-4'
      >
        {/* Industry / Sector */}
        <div className='flex flex-col gap-1'>
          <Label htmlFor='industry'>Industry / Sector</Label>
          <Input
            id='industry'
            placeholder='Tech, Healthcare, Finance etc.'
            required
          />
        </div>

        {/* Headquarter Location */}
        <div className='flex flex-col gap-1'>
          <Label htmlFor='location'>Head-Quarter Location</Label>
          <Input id='location' placeholder='ABC CITY, ROAD XYZ' required />
        </div>

        {/* Description (Textarea spans 2 columns) */}
        <div className='flex flex-col gap-1 md:col-span-2'>
          <Label htmlFor='description'>Description</Label>
          <Textarea
            id='description'
            placeholder='Brief description about your company'
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <div className='md:col-span-2 flex justify-end'>
          <Button type='submit'>Signup</Button>
        </div>
      </form>
    </div>
  );
}

export default CompanyDetailForm;
