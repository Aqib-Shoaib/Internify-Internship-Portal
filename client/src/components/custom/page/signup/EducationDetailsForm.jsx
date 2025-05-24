/* eslint-disable react/prop-types */
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import KeywordsInput from "../../utils/KeywordsInput";
import toast from "react-hot-toast";

function EducationDetailsForm({ basicData }) {
  const [skills, setSkills] = useState([]);
  const [website, setWebsite] = useState("");
  const [education, setEducation] = useState({
    university: "",
    degree: "",
    major: "",
    year: "",
    currentYear: "",
  });

  const handleSkillsKeywordsChange = (keywords) => {
    setSkills(keywords);
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ skills, website, education, ...basicData });

    toast.success("You Have Successfully Signed Up With Internify");
  }

  return (
    <div className='w-full p-4'>
      <h2 className='text-base font-semibold mb-3'>
        Educational Details{" "}
        <p className='text-[10px] font-normal'>
          You can skip this if you are in a hurry, we recommend adding at least
          Your education details
        </p>
      </h2>

      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 md:grid-cols-2 gap-4'
      >
        {/* College / University */}
        <div className='flex flex-col gap-1'>
          <Label htmlFor='university'>College / University</Label>
          <Input
            id='university'
            type='text'
            value={education.university}
            onChange={(e) =>
              setEducation((prev) => ({ ...prev, university: e.target.value }))
            }
          />
        </div>

        {/* Major */}
        <div className='flex flex-col gap-1'>
          <Label htmlFor='major'>Major</Label>
          <Select
            onValueChange={(major) =>
              setEducation((prev) => ({ ...prev, major }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select your Major' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>major</SelectLabel>
                <SelectItem value='BS'>BS</SelectItem>
                <SelectItem value='MS'>MS</SelectItem>
                <SelectItem value='BSc'>BSc</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Degree */}
        <div className='flex flex-col gap-1'>
          <Label htmlFor='degree'>Degree</Label>
          <Input
            id='degree'
            placeholder='e.g. Software Engineering'
            value={education.degree}
            onChange={(e) =>
              setEducation((prev) => ({ ...prev, degree: e.target.value }))
            }
          />
        </div>

        {/* Current Year (Select) */}
        <div className='flex flex-col gap-1'>
          <Label htmlFor='currentYear'>Current Year</Label>
          <Select
            onValueChange={(currentYear) =>
              setEducation((prev) => ({ ...prev, currentYear }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select year' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='freshman'>Freshman (1st year)</SelectItem>
              <SelectItem value='sophomore'>Sophomore (2nd year)</SelectItem>
              <SelectItem value='junior'>Junior (3rd year)</SelectItem>
              <SelectItem value='senior'>Senior (4th year)</SelectItem>
              <SelectItem value='graduate'>Graduate</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex flex-col gap-1'>
          <Label htmlFor='year'>Last Year</Label>
          <Input
            type='text'
            placeholder='e.g. 2025'
            value={education.year}
            onChange={(e) =>
              setEducation((prev) => ({ ...prev, year: e.target.value }))
            }
          />
        </div>

        {/* Portfolio/Website */}
        <div className='flex flex-col gap-1'>
          <Label>
            Website URL
            <span className='text-xs text-muted-foreground ml-1'>(if any)</span>
          </Label>
          <Input
            type='url'
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        {/* Skills (custom keywords input) */}
        <div className='flex flex-col gap-1 md:col-span-2'>
          <Label>Add your skills</Label>
          <KeywordsInput onKeywordsChange={handleSkillsKeywordsChange} />
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
