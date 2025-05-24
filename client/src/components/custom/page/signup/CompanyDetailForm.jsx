/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/stateActions/userActions";
import { useNavigate } from "react-router-dom";

function CompanyDetailForm({ basicData }) {
  const [companyData, setCompanyData] = useState({
    industry: "",
    website: "",
    location: "",
    bio: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setCompanyData((prev) => ({ ...prev, [name]: value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const data = { ...companyData, ...basicData };
    try {
      await dispatch(registerUser(data)).unwrap();
      toast.success("You Have Successfully Signed Up With Internify");
      localStorage.setItem("userobj", JSON.stringify(data));
      navigate("/otp");
    } catch (err) {
      toast.error(err || "Registeration Failed");
      navigate("/signup");
    }
  }

  return (
    <div className='w-full p-4'>
      <h2 className='text-base font-semibold mb-3'>
        Company Details{" "}
        <p className='text-[10px] font-normal'>
          You can skip this if you are in a hurry, we recommend adding at least
          Industry and Location
        </p>
      </h2>

      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 md:grid-cols-2 gap-4'
      >
        {/* Industry / Sector */}
        <div className='flex flex-col gap-1'>
          <Label htmlFor='industry'>Industry / Sector</Label>
          <Input
            id='industry'
            required
            name='industry'
            value={companyData.industry}
            onChange={(e) => handleInputChange(e)}
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
            name='website'
            value={companyData.website}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        {/* Headquarter Location */}
        <div className='flex flex-col gap-1 md:col-span-2'>
          <Label htmlFor='location'>Head-Quarter Location</Label>
          <Input
            id='location'
            required
            name='location'
            value={companyData.location}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        {/* Description (Textarea spans 2 columns) */}
        <div className='flex flex-col gap-1 md:col-span-2'>
          <Label htmlFor='description'>Description</Label>
          <Textarea
            id='description'
            rows={4}
            name='bio'
            value={companyData.bio}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        {/* Submit Button */}
        <div className='md:col-span-2 flex justify-end'>
          <Button type='submit' disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CompanyDetailForm;
