/* eslint-disable react/prop-types */
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import Googlebtn from "../../utils/Googlebtn";

function BasicInfoForm({ role, handleFormSubmit, setbasicData, basicData }) {
  return (
    <div className='w-full'>
      <form
        onSubmit={handleFormSubmit}
        className='grid grid-cols-1 md:grid-cols-2 gap-2'
      >
        {/* Full Name / Company Name */}
        <div className='flex flex-col gap-1'>
          <Label>{role === "COMPANY" ? "Company Name" : "Full Name"}</Label>
          <Input
            type='text'
            required
            onChange={(e) =>
              setbasicData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        {/* Email */}
        <div className='flex flex-col gap-1'>
          <Label>Email</Label>
          <Input
            type='email'
            name='email'
            required
            value={basicData.email}
            onChange={(e) =>
              setbasicData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>

        {/* Phone Number */}
        <div className='flex flex-col gap-1'>
          <Label>Phone Number</Label>
          <PhoneInput
            value={basicData.phoneNumber}
            onChange={(e) =>
              setbasicData((prev) => ({ ...prev, phoneNumber: e }))
            }
            defaultCountry='PK'
            required
            className='border border-border bg-background rounded-md p-2 text-sm'
          />
        </div>

        {/* Password */}
        <div className='flex flex-col gap-1'>
          <Label>Password</Label>
          <Input
            type='password'
            name='password'
            required
            minLength={8}
            value={basicData.password}
            onChange={(e) =>
              setbasicData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>

        {/* Google Button with divider */}
        <div className='col-span-1 md:col-span-2 flex flex-col items-center gap-4 mt-2'>
          <div className='flex items-center w-full gap-2'>
            <hr className='flex-grow border-t border-gray-300' />
            <span className='text-sm text-muted-foreground'>OR</span>
            <hr className='flex-grow border-t border-gray-300' />
          </div>
          <Googlebtn text='Sign up with Google' />
        </div>

        {/* Submit Button */}
        <div className='md:col-span-2 flex justify-end'>
          <Button type='submit'>Next</Button>
        </div>
      </form>
    </div>
  );
}

export default BasicInfoForm;
