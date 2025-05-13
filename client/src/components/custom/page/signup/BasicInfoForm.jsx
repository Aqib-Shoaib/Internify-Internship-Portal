/* eslint-disable react/prop-types */
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import Googlebtn from "../../utils/Googlebtn";

function BasicInfoForm({ role, incrementFormNumber }) {
  const [value, setValue] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    incrementFormNumber();
  }

  return (
    <div className='w-full p-4'>
      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 md:grid-cols-2 gap-4'
      >
        {/* Full Name / Company Name */}
        <div className='flex flex-col gap-1'>
          <Label>{role === "COMPANY" ? "Company Name" : "Full Name"}</Label>
          <Input
            type='text'
            placeholder={role === "COMPANY" ? "Company Name" : "Full Name"}
            required
          />
        </div>

        {/* Email */}
        <div className='flex flex-col gap-1'>
          <Label>Email</Label>
          <Input type='email' placeholder='example@gmail.com' required />
        </div>

        {/* Phone Number */}
        <div className='flex flex-col gap-1'>
          <Label>Phone Number</Label>
          <PhoneInput
            placeholder='Enter phone number'
            value={value}
            onChange={setValue}
            defaultCountry='PK'
            required
            className='border border-input bg-background rounded-md p-2 text-sm'
          />
        </div>

        {/* Password */}
        <div className='flex flex-col gap-1'>
          <Label>Password</Label>
          <Input type='password' required />
        </div>

        {/* Confirm Password */}
        <div className='flex flex-col gap-1'>
          <Label>Password Confirm</Label>
          <Input type='password' required />
        </div>

        {/* Portfolio/Website */}
        <div className='flex flex-col gap-1'>
          <Label>
            {role === "COMPANY" ? "Website URL" : "Portfolio URL"}
            <span className='text-xs text-muted-foreground ml-1'>(if any)</span>
          </Label>
          <Input type='url' placeholder='www.example.com' />
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
