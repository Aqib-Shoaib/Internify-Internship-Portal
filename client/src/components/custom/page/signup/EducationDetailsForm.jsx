import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import KeywordsInput from "../../utils/KeywordsInput";

function EducationDetailsForm() {
  const [skills, setSkills] = useState([]);

  const handleSkillsKeywordsChange = (keywords) => {
    setSkills(keywords);
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(skills);
  }

  return (
    <div className='w-full p-4'>
      <h2 className='text-base font-semibold mb-3'>Educational Details</h2>

      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 md:grid-cols-2 gap-4'
      >
        {/* College / University */}
        <div className='flex flex-col gap-1'>
          <Label htmlFor='college'>College / University</Label>
          <Input id='college' placeholder='UET Taxila' />
        </div>

        {/* Major */}
        <div className='flex flex-col gap-1'>
          <Label htmlFor='major'>Major</Label>
          <Input id='major' placeholder='MS, BS etc' />
        </div>

        {/* Degree */}
        <div className='flex flex-col gap-1'>
          <Label htmlFor='degree'>Degree</Label>
          <Input id='degree' placeholder='Software Engineer' />
        </div>

        {/* Current Year (Select) */}
        <div className='flex flex-col gap-1'>
          <Label htmlFor='year'>Current Year</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='Select year' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='freshman'>Freshman (1st year)</SelectItem>
              <SelectItem value='sophomore'>Sophomore (2nd year)</SelectItem>
              <SelectItem value='junior'>Junior (3rd year)</SelectItem>
              <SelectItem value='senior'>Senior (4th year)</SelectItem>
              <SelectItem value='graduate'>Graduate</SelectItem>
              <SelectItem value='postGraduate'>Post Graduate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Skills (custom keywords input) */}
        <div className='flex flex-col gap-1 md:col-span-2'>
          <Label>Add your skills</Label>
          <KeywordsInput
            onKeywordsChange={handleSkillsKeywordsChange}
            placeholder='React Nodejs Photoshop etc.'
          />
        </div>

        {/* Submit button */}
        <div className='md:col-span-2 flex justify-end'>
          <Button type='submit'>Signup</Button>
        </div>
      </form>
    </div>
  );
}

export default EducationDetailsForm;
